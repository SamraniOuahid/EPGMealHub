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

// Mettre à jour un repas
exports.updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(meal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Obtenir un repas par ID
exports.getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: "Repas non trouvé" });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};