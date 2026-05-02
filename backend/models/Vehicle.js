const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['Sedan', 'SUV', 'MiniBus', 'Luxury', 'Bike', 'Bus'], required: true },
    capacity: { type: Number, required: true },
    pricePerKm: { type: Number, required: true },
    basePrice: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vehicle', vehicleSchema);
