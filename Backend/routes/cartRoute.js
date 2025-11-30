import { addToCart,updateCart,getUserCart } from "../controllers/chartController.js";
import express from "express";
import authUser from "../middleware/userAuth.js";

const cartRouter = express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToCart)
cartRouter.post('/update',authUser,updateCart)


export default cartRouter