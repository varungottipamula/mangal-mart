import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // filename under frontend/images
  description: String,
});

export default mongoose.model("Product", productSchema);
