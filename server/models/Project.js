const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({ url: String, caption: String });

const ProjectSchema = new mongoose.Schema({
  slug:        { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, enum: ['Web', 'Data', 'ML'], required: true },
  techStack:   [String],
  images:      [ImageSchema],
  liveUrl:     String,
  githubUrl:   String,
  icon:        { type: String, default: '📄' },
  createdAt:   { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
