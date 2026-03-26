const express = require('express');
const router = express.Router();
const WindowState = require('../models/WindowState');

// GET saved window state for a session
router.get('/:sessionId', async (req, res) => {
  try {
    const state = await WindowState.findOne({ sessionId: req.params.sessionId });
    res.json(state ? state.windows : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (upsert) window state for a session
router.post('/:sessionId', async (req, res) => {
  try {
    const state = await WindowState.findOneAndUpdate(
      { sessionId: req.params.sessionId },
      { windows: req.body.windows, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ ok: true, state });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
