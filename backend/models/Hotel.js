const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 4 },
    pricePerNight: { type: Number, required: true }, // Default/Base price
    roomTypes: [
      {
        name: { type: String, required: true }, // e.g., 'Standard', 'Deluxe', 'Suite'
        additionalCost: { type: Number, default: 0 },
      },
    ],
    amenities: [{ type: String }],
    imageUrl: { type: String, default: '' },
    website: { type: String, default: '' },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);
