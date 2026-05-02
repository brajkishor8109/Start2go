const express = require('express');
const Hotel = require('../models/Hotel');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Get all available hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find({ isAvailable: true });
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Create a hotel
router.post('/', auth, admin, async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(201).json(hotel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid hotel data' });
  }
});

// Admin: Update a hotel
router.patch('/:id', auth, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid hotel data' });
  }
});

// Admin: Delete a hotel
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json({ message: 'Hotel deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
