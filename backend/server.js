const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const destinationRoutes = require('./routes/destinations');
const packageRoutes = require('./routes/packages');
const bookingRoutes = require('./routes/bookings');
const storyRoutes = require('./routes/stories');
const blogRoutes = require('./routes/blogs');
const vehicleRoutes = require('./routes/vehicles');
const hotelRoutes = require('./routes/hotels');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/incredible_india_travel';
mongoose
  .connect(MONGO_URI, { autoIndex: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/contact', contactRoutes);

const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(publicPath, 'admin.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

