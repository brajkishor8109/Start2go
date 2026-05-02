const express = require('express');
const Vehicle = require('../models/Vehicle');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Get all available vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ isAvailable: true });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Create a vehicle
router.post('/', auth, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid vehicle data' });
  }
});

// Admin: Update a vehicle
router.patch('/:id', auth, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid vehicle data' });
  }
});

// Admin: Delete a vehicle
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
