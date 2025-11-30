import express from "express";
import {
  listProduct,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "./../middleware/userAuth.js";
import permissionGuard from "../middleware/permissionGuard.js";
import userAuthorized from "./../middleware/userAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/single", userAuthorized, singleProduct);
productRouter.get("/list", userAuthorized, listProduct);

export default productRouter;
