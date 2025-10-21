import express from "express";
import Product from "../models/productModel.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get products" });
  }
});

// POST add product (admin)
router.post("/", async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.json({ message: "Product added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product" });
  }
});

export default router;
