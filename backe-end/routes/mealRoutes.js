const express = require("express");
const {
  getAllMeals,
  createMeal,
  deleteMeal,
  updateMeal,
  getMealById
} = require("../controllers/mealController");
const router = express.Router();

// Route pour obtenir tous les repas
router.get("/meals", getAllMeals);

// Route pour créer un repas
router.post("/meals", createMeal);

// Route pour supprimer un repas
router.delete("/meals/:id", deleteMeal);

// Route pour mettre à jour un repas
router.put("/meals/:id", updateMeal);

// Route pour obtenir un repas par ID
router.get("/meals/:id", getMealById);

module.exports = router;
