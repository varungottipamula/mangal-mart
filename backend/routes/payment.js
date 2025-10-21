import express from "express";
import Razorpay from "razorpay";
import Order from "../models/orderModel.js";

const router = express.Router();

// test GET route
router.get("/", (req, res) => {
  res.send("✅ Payment route is working!");
});

// Replace with your real Razorpay keys
const razorpay = new Razorpay({
  key_id: "rzp_live_xxx",
  key_secret: "your_secret"
});

// create an order (Razorpay)
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees
    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "order_rcptid_" + Date.now()
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("create-order err:", err);
    res.status(500).json({ message: "Failed to create order" });
  }
});

// save order in DB after successful payment
router.post("/save-order", async (req, res) => {
  try {
    const { products, amount, paymentId } = req.body;
    const newOrder = new Order({ products, amount, paymentId });
    await newOrder.save();
    res.json({ success: true });
  } catch (err) {
    console.error("save-order err:", err);
    res.status(500).json({ success: false, message: "Failed to save order" });
  }
});

export default router;
