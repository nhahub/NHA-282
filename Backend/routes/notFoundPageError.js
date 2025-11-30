import express from "express";
import CustomError from "../utils/CustomError.js";

const notFoundRouter = express.Router();

notFoundRouter.route("*").all((req, res, next) => {
  const err = new CustomError(`Page ${req.path} Not Found`, 404, "Not found");
  next(err);
});

export default notFoundRouter;
