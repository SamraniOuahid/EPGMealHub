const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Meal", mealSchema);
