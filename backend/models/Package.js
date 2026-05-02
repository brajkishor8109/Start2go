const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    facilities: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    imageUrl: { type: String, default: '' },
    destinations: [{ type: String }],
    startPoints: [
      {
        location: { type: String, required: true },
        additionalCost: { type: Number, default: 0 },
      },
    ],
    endPoints: [
      {
        location: { type: String, required: true },
        additionalCost: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packageSchema);

