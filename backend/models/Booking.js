const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelers: { type: Number, required: true },
    travelDate: { type: Date, required: true },
    // In this demo UI we send a package key like "golden-triangle".
    // If you later seed real packages in MongoDB, you can switch this back to ObjectId and send the package _id.
    packageId: { type: String, required: true },
    notes: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    hotelSelection: [
      {
        hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
        roomType: { type: String }, // Selected room type name
      },
    ],
    startPoint: { type: String, required: true },
    endPoint: { type: String, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);

