const Meal = require("../models/mealModel");

// Obtenir tous les repas
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un repas
exports.createMeal = async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un repas
exports.deleteMeal = async (req, res) => {
  try {
    await Meal.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Repas supprimé" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
