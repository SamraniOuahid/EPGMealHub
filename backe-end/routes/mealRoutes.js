const express = require("express");
const {
  getAllMeals,
  createMeal,
  deleteMeal,
} = require("../controllers/mealController");
const router = express.Router();

// Route pour obtenir tous les repas
router.get("/meals", getAllMeals);

// Route pour créer un repas
router.post("/meals", createMeal);

// Route pour supprimer un repas
router.delete("/meals/:id", deleteMeal);

module.exports = router;
