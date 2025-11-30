import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import util from "util";
import userModel from "../models/userModel.js";

//user session Authorization middleware
const userAuthorized = asyncErrorHandler(async (req, res, next) => {
  //check the authorization sent with the req
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new CustomError("authorization token is missing", 401));
  }
  // console.log("req.headers", req.headers);

  //extract the token
  const token = req.headers.authorization.split(" ")[1];
  console.log("token: ", token);
  //verify the token
  const decodedToken = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );
  //checks if the user still in the data base
  const user = await userModel.findById(decodedToken.id);
  if (!user) {
    return next(
      new CustomError("the user with the given token does Not exist", 401)
    );
  }
  //checks password changed
  const isChanged = await user.isPassowordChanged(decodedToken.iat);
  if (isChanged) {
    next(
      new CustomError(
        "account Password has Changed recently , Please login again",
        401,
        "changedPassword"
      )
    );
  }

  req.user = user;
  next();
});

export default userAuthorized;
