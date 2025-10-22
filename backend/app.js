import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import connectDB from './database.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Serve frontend from repo root (one level above backend folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, '..'); // points to repo root

app.use(express.static(frontendPath));

// Fallback for HTML pages
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server
const PORT = process.env.PORT || process.env.PORT; // Render sets PORT automatically
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
