const express = require('express');
const router = express.Router();
const NotepadContent = require('../models/NotepadContent');

// GET note by id
router.get('/:noteId', async (req, res) => {
  try {
    const note = await NotepadContent.findOne({ noteId: req.params.noteId });
    res.json({ content: note ? note.content : '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (upsert) note content
router.put('/:noteId', async (req, res) => {
  try {
    const note = await NotepadContent.findOneAndUpdate(
      { noteId: req.params.noteId },
      { content: req.body.content, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ ok: true, note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
