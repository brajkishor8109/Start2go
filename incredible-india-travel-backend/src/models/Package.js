import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    facilities: [{ type: String }],
    rating: { type: Number, default: 4.5 },
    destination: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
export default Package;

