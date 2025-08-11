import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Rental Management API is running' });
});

// Properties routes
app.get('/api/properties', (req, res) => {
  // TODO: Implement property listing
  res.json({ message: 'Properties endpoint' });
});

// Bookings routes
app.get('/api/bookings', (req, res) => {
  // TODO: Implement booking listing
  res.json({ message: 'Bookings endpoint' });
});

// Customers routes
app.get('/api/customers', (req, res) => {
  // TODO: Implement customer listing
  res.json({ message: 'Customers endpoint' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

export default app;
