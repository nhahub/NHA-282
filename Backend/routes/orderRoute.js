import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/userAuth.js";
import userAuthorized from "../middleware/userAuth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place",userAuthorized, placeOrder);
orderRouter.post("/stripe",userAuthorized, placeOrderStripe);
// User Feature
orderRouter.get("/userorders",userAuthorized, userOrders);

// verify payment

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
