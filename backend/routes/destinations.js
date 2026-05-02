const express = require('express');
const Destination = require('../models/Destination');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const destinations = await Destination.find().sort({ name: 1 });
    res.json(destinations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, admin, async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    res.status(201).json(destination);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid destination data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Destination name or slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, admin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid destination data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Destination name or slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted' });
  } catch (err) {
    console.error(err);
    if (err && err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid destination id' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

