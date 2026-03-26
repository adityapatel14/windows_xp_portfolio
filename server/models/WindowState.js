const mongoose = require('mongoose');

const windowEntrySchema = new mongoose.Schema({
  id: String,
  appId: String,
  title: String,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  isMinimized: Boolean,
  isMaximized: Boolean,
  zIndex: Number,
});

const WindowStateSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  windows: [windowEntrySchema],
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WindowState', WindowStateSchema);
