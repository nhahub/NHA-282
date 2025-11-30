import express from "express";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  adminLogin,
} from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.route("/forgotpassword").post(forgotPassword);
userRouter.route("/resetpassword/:Token").patch(resetPassword);

export default userRouter;
