const Commande = require("../models/commandeModel");

// Créer une commande
exports.createCommande = async (req, res) => {
  try {
    // Debug pour voir ce que tu reçois
    console.log("Données reçues:", req.body);

    const commande = await Commande.create(req.body);
    res.status(201).json(commande);
  } catch (error) {
    console.error("Erreur création commande:", error);
    res.status(400).json({ error: error.message });
  }
};
// Obtenir toutes les commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find()
      .populate("userId")
      .populate("mealId");
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    await Commande.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Commande supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
