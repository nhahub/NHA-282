import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import asyncErrorHandler from "./../utils/asyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";
import sendEmail from "../utils/email.js";
import crypto from "crypto";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

// user login controller
const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //checks if email & password exist in the request
  if (!email || !password) {
    const err = new CustomError(
      "please provide email address and password to login",
      400,
      "fail"
    );
    next(err);
  }
  //find user with requested email
  const user = await userModel.findOne({ email }).select("+password");
  //checking cridentials
  if (!user || !(await user.comparePasswords(password, user.password))) {
    const err = new CustomError(
      "wrong email or password, please check again...",
      400,
      "fail"
    );
    return next(err);
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

//user register controller
const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // check user already exists or not
  const exists = await userModel.findOne({ email });
  if (exists) {
    next(new CustomError("user already exists", 400, "fail"));
    return;
  }

  //creating the user
  const newuser = await userModel.create(req.body);

  const token = signToken(newuser._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      newuser,
    },
  });
});

//forgot password contoller
const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  //checks if user exists
  const email = req.body.email;
  const { origin } = req.headers;
  const user = await userModel.findOne({ email });
  if (!user) {
    next(new CustomError("User Not found"));
    return;
  }

  //generate Random Token for reseting the password
  const resetToken = user.createResetPasswordToken();

  //save the resetToken to a user object in Database
  await user.save({ validateBeforeSave: false });

  //send the mail to the user
  const resetUrl = `${origin}/resetpassword/${resetToken}`;

  const message = `We have recieved a password reset request. Please use the below link to reset your password \n\n ${resetUrl}\n\n this like will expire after 10 minute`;
  const subject = `password reset request`;

  try {
    await sendEmail({
      email,
      message,
      subject,
    });

    //send response to
    res.status(200).json({
      status: "success",
      data: {
        message: "reset password mail Sent",
      },
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;
    user.save({ validateBeforeSave: false });
    return next(
      new CustomError("Something went worng, please try again later", 500)
    );
  }
});

//reseting the user password
const resetPassword = asyncErrorHandler(async (req, res, next) => {
  //checking if reset Token provided
  let { password, confirmPassword } = req.body;
  console.log(req.params.Token);
  if (!req.params.Token) {
    return next(new CustomError("no Token porvided, please try again"));
  }
  console.log(password, confirmPassword);
  if (!password || !confirmPassword) {
    return next(
      new CustomError("Please Provide a password and confirm it", 400)
    );
  }
  //encrypt Token as in database
  const Token = crypto
    .createHash("sha256")
    .update(req.params.Token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: Token,
    // resetPasswordTokenExpiresAt: { $gte: Date.now() },
  });

  if (!user) {
    return next(new CustomError("Invalid Token or expired", 401));
  }

  //update users Password and remove Token
  user.password = password;
  user.confirmPassword = confirmPassword;
  user.resetPasswordTokenExpiresAt = undefined;
  user.resetPasswordToken = undefined;
  user.passwordChangedAt = Date.now();
  await user.save();

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    message: "New password was set succesfully",
    data: {
      user,
    },
  });
});

// Route For admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, forgotPassword, resetPassword };
