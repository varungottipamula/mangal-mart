import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './database.js';

// Load environment variables
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to frontend (all HTML/CSS/JS in repo root)
const frontendPath = path.join(__dirname, '..');

// Serve static frontend files
app.use(express.static(frontendPath));

// === Backend API routes ===
// Example routes, adjust as needed
import productRoutes from './routes/product.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payment.js';

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// === Optional fallback for SPA (if needed) ===
// app.get('*', (req, res) => {
//   res.sendFile(path.join(frontendPath, 'index.html'));
// });

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
