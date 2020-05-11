const mongoose = require('mongoose');

const PreviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  src: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Preview = mongoose.model('preview', PreviewSchema);
