import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const UserModelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Fix the typo here
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase
    validate: [validator.isEmail, "please provide a valid email address"], // Email validation
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Set a minimum password length
    select: false,
  },
  confirmPassword: {
    type: String,
    required: true,
    minlength: 6, // Set a minimum password length
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "the password and confirmPassword must be identical",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Example roles, can be extended
    default: "user", // Default role
  },
  isActive: {
    type: Boolean,
    default: true, // Default status for users
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the current date
  },
  cartData: { type: Object, default: {} },
  passwordChangedAt: Date, //helps in authentication
  resetPasswordToken: String, //token will be generated when user asks for password reset
  resetPasswordTokenExpiresAt: Date,
});

//User schema Middleware
//encrypting the password and removing the confirmPassword field befor saving it to data base
UserModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //encrypt the password
  this.password = await bcrypt.hash(this.password, 10);
  //remove confirmPassword before saving the document
  this.confirmPassword = undefined;
  next();
});

//User Model methods
//compare passwords when login
UserModelSchema.methods.comparePasswords = async function (pswd, pswdDB) {
  return await bcrypt.compare(pswd, pswdDB);
};

//checks if user changed password (helps in authentication)
UserModelSchema.methods.isPassowordChanged = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp =
      parseInt(this.passwordChangedAt.getTime(), 10) / 1000;
    // console.log(passwordChangedTimeStamp, jwtTimeStamp);
    return jwtTimeStamp < passwordChangedTimeStamp;
  }
  return false;
};

//creates a reset password token to allow the user reset password
UserModelSchema.methods.createResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  //hashing the token to store it in database
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //setting reset Token details to the use in database
  this.resetPasswordToken = hashedToken;
  this.resetPasswordTokenExpiresAt = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const userModel = mongoose.model("user", UserModelSchema);

export default userModel;
