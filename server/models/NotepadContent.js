const mongoose = require('mongoose');

const NotepadContentSchema = new mongoose.Schema({
  noteId: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NotepadContent', NotepadContentSchema);
