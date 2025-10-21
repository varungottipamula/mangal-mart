import express from "express";
import Order from "../models/orderModel.js";

const router = express.Router();

// GET admin root - for testing
router.get("/", (req, res) => {
  res.send("✅ Admin route is working!");
});

// GET all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;

