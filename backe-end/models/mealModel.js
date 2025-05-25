const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String }, // Ajouté
  discount: { type: Number, default: 0 }, // Ajouté
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model("Meal", mealSchema);
