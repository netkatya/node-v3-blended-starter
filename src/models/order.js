import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      }
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "paid",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

export const Order = mongoose.model("Order", orderSchema);
