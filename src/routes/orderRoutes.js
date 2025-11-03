import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { Order } from "../models/order.js";

export const ordersRouter = express.Router();

ordersRouter.post("/", authenticate, createOrder);
ordersRouter.get("/my", authenticate, getMyOrders);


