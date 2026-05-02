import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelers: { type: Number, required: true },
    travelDate: { type: Date, required: true },
    packageId: { type: String , required: true},
    packageName: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;

