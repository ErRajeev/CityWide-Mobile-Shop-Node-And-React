import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: { type: String },
  quantity: { type: Number, default: 1 },
  totalCost: { type: Number },
});

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    cartProducts: {
      type: [productSchema],
      default: [],
    },
    allProductCost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const purchaseSchema = new Schema({
  userId: {
    type: String,
  },
  orders: {
    type: [orderSchema],
    default: [],
  },
});

const Purchase = model("Purchase", purchaseSchema);
export default Purchase;
