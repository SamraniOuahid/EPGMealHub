const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mealId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Meal",
    required: true,
  },
  dateCommande: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["en attente", "confirmée", "annulée"],
    default: "en attente",
  },
});

module.exports = mongoose.model("Commande", commandeSchema);
