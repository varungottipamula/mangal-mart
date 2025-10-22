import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import connectDB from './database.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Serve static frontend files from public folder
app.use(express.static(path.join(process.cwd(), 'backend/public')));

// Serve index.html on root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'backend/public/index.html'));
});

// Backend API routes
import productRoutes from './routes/product.js';
import adminRoutes from './routes/admin.js';
import paymentRoutes from './routes/payment.js';

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payment', paymentRoutes);

// Fallback for other HTML pages
app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(path.join(process.cwd(), `backend/public/${page}.html`));
});

// Start server on Render's dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
