import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import connectDB from "./database.js";
import productRoutes from "./routes/product.js";
import adminRoutes from "./routes/admin.js";
import paymentRoutes from "./routes/payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Wrap in async IIFE to await DB connection
(async () => {
  try {
    console.log("🚀 Starting server...");
    await connectDB();
    console.log("✅ Database connected");

    app.use(cors());
    app.use(express.json());

    // API routes
    app.use("/products", productRoutes);
    app.use("/admin", adminRoutes);
    app.use("/payment", paymentRoutes);

    // Serve frontend static files
    app.use(express.static(path.join(__dirname, "..", "frontend")));

    // Fallback to index.html for root
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
    });

    const PORT = 5000;
    app.listen(PORT, () =>
      console.log(`🌐 Server running at http://localhost:${PORT}`)
    );

  } catch (err) {
    console.error("❌ Server startup failed:", err);
  }
})();
