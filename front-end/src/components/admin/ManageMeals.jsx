import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";

export default function ManageMeals() {
  const [meals, setMeals] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    discount: "",
    available: true,
  });
  const fileInputRef = useRef();

  const token = localStorage.getItem("token");

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMeals(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des repas :", err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setForm((prev) => ({ ...prev, image: res.data.filename || res.data.url }));
    } catch (err) {
      alert("Erreur lors de l'upload de l'image");
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingMeal) {
        await axios.put(
          `http://localhost:5000/api/meals/${editingMeal._id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // Correction ici : POST sur /api/meals, pas /api/upload
        await axios.post(
          "http://localhost:5000/api/meals",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setForm({ name: "", description: "", price: "", image: "", discount: "", available: true });
      setEditingMeal(null);
      setOpenDialog(false);
      fetchMeals();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce repas ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/meals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMeals();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const openEditDialog = (meal) => {
    setEditingMeal(meal);
    setForm(meal);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gérer les repas 🍽️
      </Typography>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => {
          setEditingMeal(null);
          setForm({ name: "", description: "", price: "", image: "", discount: "", available: true });
          setOpenDialog(true);
        }}
        sx={{ mb: 2 }}
      >
        Ajouter un repas
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Remise</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((meal) => (
            <TableRow key={meal._id}>
              <TableCell>{meal.name}</TableCell>
              <TableCell>{meal.description}</TableCell>
              <TableCell>{meal.price} MAD</TableCell>
              <TableCell>{meal.discount} MAD</TableCell>
              <TableCell>{meal.image}</TableCell>
              <TableCell>
                <IconButton onClick={() => openEditDialog(meal)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(meal._id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* DIALOG FORM */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{editingMeal ? "Modifier le repas" : "Ajouter un nouveau repas"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Nom" name="name" value={form.name} onChange={handleChange} />
          <TextField label="Description" name="description" value={form.description} onChange={handleChange} />
          <TextField label="Prix" name="price" type="number" value={form.price} onChange={handleChange} />
          <TextField label="Remise" name="discount" type="number" value={form.discount} onChange={handleChange} />
          {/* Champ pour choisir une image */}
          <Button
            variant="outlined"
            component="label"
            sx={{ textTransform: "none" }}
          >
            {form.image ? "Changer l'image" : "Choisir une image"}
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </Button>
          {/* Affiche l'image sélectionnée */}
          {form.image && (
            <img
              src={`/images/${form.image}`}
              alt="Aperçu"
              style={{ width: 120, marginTop: 8, borderRadius: 8 }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" color="success">
            {editingMeal ? "Mettre à jour" : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
