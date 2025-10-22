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

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to frontend (repo root, one level above backend folder)
const frontendPath = path.join(__dirname, '..');

// Serve static frontend files (CSS, JS, images)
app.use(express.static(frontendPath));

// Serve index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// === Backend API routes ===
import productRoutes from './routes/product.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payment.js';

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// Fallback for all other HTML pages
app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(frontendPath, `${page}.html`);
  res.sendFile(filePath);
});

// Start server on Render's dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
