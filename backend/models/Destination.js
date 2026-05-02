const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String, required: true },
    description: { type: String, required: true },
    bestTimeToVisit: { type: String, required: true },
    attractions: [{ type: String }],
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Destination', destinationSchema);

