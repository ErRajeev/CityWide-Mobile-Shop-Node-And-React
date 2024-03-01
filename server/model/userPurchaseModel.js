import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productId: {
    type: String,
    // type: Schema.Types.ObjectId,
  },
  quantity: { type: Number, default: 1, min: 1 },
  totalCost: { type: Number, min: 0 },
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
