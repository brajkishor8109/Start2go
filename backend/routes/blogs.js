const express = require('express');
const Blog = require('../models/Blog');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, admin, async (req, res) => {
  try {
    const post = await Blog.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid blog data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Blog slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, admin, async (req, res) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: 'Blog not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    if (err && (err.name === 'ValidationError' || err.name === 'CastError')) {
      return res.status(400).json({ message: 'Invalid blog data' });
    }
    if (err && err.code === 11000) {
      return res.status(400).json({ message: 'Blog slug already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    console.error(err);
    if (err && err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid blog id' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

