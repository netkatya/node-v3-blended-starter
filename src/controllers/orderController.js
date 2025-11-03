import { Order } from "../models/order.js";

export const createOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      userId: req.user._id,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });

    res.status(201).json({
      message: "Order created successfully ✅",
      order,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      paymentDate: -1,
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};
