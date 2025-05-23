import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Typography, MenuItem, Box
  } from "@mui/material";
  import axios from "axios";
  import { useState } from "react";
  
  const OrderDialog = ({ open, onClose, meal }) => {
    const [time, setTime] = useState("");
  
    const calculateDiscountedPrice = () => {
        if (!time) return meal.price;
      
        const [hour, minute] = time.split(":").map(Number);
        const minutesSinceNine = (hour - 9) * 60 + minute;
        if (minutesSinceNine < 0) return meal.price; // Avant 9h, pas de remise
      
        const discountRate = Math.min((minutesSinceNine / 540), 1); // 540 min = 9h de 9:00 à 18:00
        const maxDiscount = 5; // par exemple : jusqu'à 5 DH de remise
        const discount = discountRate * maxDiscount;
      
        return Math.max(0, meal.price - discount);
      };
      
  
    const handleOrder = () => {
      const token = localStorage.getItem("token");
      axios.post("http://localhost:5000/api/commandes", {
        mealId: meal._id,
        scheduledTime: time
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => {
          alert("Commande passée avec succès !");
          onClose();
        })
        .catch((err) => {
          alert("Erreur lors de la commande.");
          console.error(err);
        });
    };
  
    return (
      <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle sx={{ color: "primary.main", fontWeight: 700 }}>
          Commander {meal.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Choisissez une heure (09:00 - 18:00)"
            type="time"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
            inputProps={{ min: "09:00", max: "18:00" }}
            sx={{ mt: 2 }}
          />
          <Box sx={{ mt: 3, mb: 1, textAlign: "center" }}>
            <Typography variant="h6" color="success.main" fontWeight={700}>
              Prix avec remise : {calculateDiscountedPrice().toFixed(2)} DH
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button onClick={onClose} sx={{ fontWeight: 600 }}>Annuler</Button>
          <Button
            variant="contained"
            onClick={handleOrder}
            disabled={!time}
            sx={{
              fontWeight: 600,
              background: "linear-gradient(90deg, #43cea2 0%, #185a9d 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, #185a9d 0%, #43cea2 100%)",
              },
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default OrderDialog;
