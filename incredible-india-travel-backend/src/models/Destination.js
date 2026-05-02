import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    state: { type: String },
    description: { type: String, required: true },
    bestTimeToVisit: { type: String, required: true },
    attractions: [{ type: String }],
    images: [{ type: String }],
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;

