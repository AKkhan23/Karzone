 const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  carOwnerName: { type: String, required: true },
  shopeAdress: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true, required: true },
  fuelType: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);
