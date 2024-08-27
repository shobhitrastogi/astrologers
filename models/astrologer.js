const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: String,
  isTop: { type: Boolean, default: false },
  currentLoad: { type: Number, default: 0 },
  flowAdjustmentFactor: { type: Number, default: 1 },
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
