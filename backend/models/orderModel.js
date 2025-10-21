import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: { type: Number, default: 1 }
    }
  ],
  amount: Number,
  paymentId: String,
  status: { type: String, default: "paid" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
