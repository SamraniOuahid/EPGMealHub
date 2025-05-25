import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Typography, Box, Chip, Stack,
  InputAdornment, Slider, Divider
} from "@mui/material";
import { AccessTime, Restaurant, Close, CheckCircle } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 25,
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
  },
});

const OrderDialog = ({ open, onClose, meal }) => {
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  const calculateDiscount = () => {
    if (!time) return 0;
    const [hour, minute] = time.split(":").map(Number);
    const minutesSinceNine = (hour - 9) * 60 + minute;
    if (minutesSinceNine < 0) return 0;
    return Math.min((minutesSinceNine / 540), 1) * 5;
  };

  const calculateTotalPrice = () => {
    const discount = calculateDiscount();
    return Math.max(0, (meal.price - discount) * quantity);
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      await axios.post("http://localhost:5000/api/commandes", {
        mealId: meal._id,
        userId,
        scheduledTime: time,
        quantity,
        price: calculateTotalPrice(),
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onClose();
      // Ici vous pourriez utiliser un système de notifications plus élégant
      alert("Commande passée avec succès !");
    } catch (err) {
      console.error("Erreur de commande:", err);
      alert("Erreur lors de la commande");
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          minWidth: 400,
          background: 'linear-gradient(to bottom, #f5f7fa 0%, #e4e8f0 100%)'
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', py: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
          <Restaurant color="primary" />
          <Typography variant="h6" color="primary" fontWeight={700}>
            Commander {meal.name}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ py: 2 }}>
          {/* Contrôle de quantité */}
          <Box>
            <Typography gutterBottom>Quantité</Typography>
            <Slider
              value={quantity}
              onChange={(e, newValue) => setQuantity(newValue)}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{ maxWidth: 300 }}
            />
          </Box>

          {/* Sélection du temps */}
          <TextField
            fullWidth
            label="Heure de retrait"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime color="action" />
                </InputAdornment>
              ),
              inputProps: { min: "09:00", max: "18:00" }
            }}
          />

          {/* Affichage du prix */}
          <Box sx={{ 
            p: 2, 
            borderRadius: 2, 
            bgcolor: 'background.paper',
            boxShadow: 1
          }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1">Prix unitaire:</Typography>
                <Typography>{meal.price.toFixed(2)} DH</Typography>
              </Stack>
              
              {time && (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body1">Remise:</Typography>
                    <Chip 
                      label={`-${calculateDiscount().toFixed(2)} DH`} 
                      color="success" 
                      size="small"
                    />
                  </Stack>
                  <Divider />
                </>
              )}

              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {calculateTotalPrice().toFixed(2)} DH
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          startIcon={<Close />} 
          onClick={onClose}
          sx={{ fontWeight: 600 }}
        >
          Annuler
        </Button>
        <GradientButton
          startIcon={<CheckCircle />}
          onClick={handleOrder}
          disabled={!time}
        >
          Confirmer la commande
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;