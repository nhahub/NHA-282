import CustomError from "../utils/CustomError.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

//user premissions middleware
const permission = (role) => {
  return asyncErrorHandler(async (req, res, next) => {
    if (role !== req.user.role) {
      return next(new CustomError(`Access Denied: ${role}s Only`, 403));
    }
    next();
  });
};

export default permission;
