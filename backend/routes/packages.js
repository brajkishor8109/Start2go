const express = require('express');
const Package = require('../models/Package');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/slug/:slug', async (req, res) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, admin, async (req, res) => {
  try {
    const pkg = await Package.create(req.body);
    res.status(201).json(pkg);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid package data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Package slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, admin, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json(pkg);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid package data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Package slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted' });
  } catch (err) {
    console.error(err);
    if (err && err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid package id' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

