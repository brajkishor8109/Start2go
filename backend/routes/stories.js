const express = require('express');
const Story = require('../models/Story');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const stories = await Story.find()
      .populate('userId', 'name profilePhotoUrl')
      .populate('comments.userId', 'name profilePhotoUrl')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, text, mediaUrls } = req.body;
    const story = await Story.create({
      userId: req.user.id,
      title,
      text,
      mediaUrls: mediaUrls || [],
    });
    const populated = await story.populate('userId', 'name profilePhotoUrl');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const stories = await Story.find({ userId: req.user.id })
      .populate('userId', 'name profilePhotoUrl')
      .sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title, text: req.body.text, mediaUrls: req.body.mediaUrls || [] },
      { new: true }
    );
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Story.deleteOne({ _id: req.params.id, userId: req.user.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json({ message: 'Story deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/like', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    const hasLiked = story.likes.some((u) => u.toString() === req.user.id);
    if (hasLiked) {
      story.likes = story.likes.filter((u) => u.toString() !== req.user.id);
    } else {
      story.likes.push(req.user.id);
    }
    await story.save();
    const populated = await Story.findById(story._id)
      .populate('userId', 'name profilePhotoUrl')
      .populate('comments.userId', 'name profilePhotoUrl');
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/:id/comments', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    story.comments.push({ userId: req.user.id, text: req.body.text });
    await story.save();
    const populated = await Story.findById(story._id)
      .populate('userId', 'name profilePhotoUrl')
      .populate('comments.userId', 'name profilePhotoUrl');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

