import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Chip,
  Stack,
  InputAdornment,
  Slider,
  Divider,
  IconButton,
} from "@mui/material";
import {
  AccessTime,
  Restaurant,
  Close,
  Add,
  Remove,
} from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";

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
          maxWidth: 480,
          margin: 2
        }
      }}
    >
      <DialogTitle sx={{ 
        pb: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Restaurant color="primary" />
          <Typography variant="h6" fontWeight={700}>
            Commander {meal.name}
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={4} sx={{ pt: 2 }}>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Quantité
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                size="small"
                color="primary"
              >
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton 
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                size="small"
                color="primary"
              >
                <Add />
              </IconButton>
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Heure de retrait
            </Typography>
            <TextField
              fullWidth
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTime color="primary" />
                  </InputAdornment>
                ),
                inputProps: { min: "09:00", max: "18:00" }
              }}
              sx={{ mt: 1 }}
            />
          </Box>

          <Box sx={{ 
            p: 3,
            bgcolor: 'grey.50',
            borderRadius: 2
          }}>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography color="text.secondary">Prix unitaire</Typography>
                <Typography fontWeight={500}>{meal.price.toFixed(2)} DH</Typography>
              </Stack>

              {time && (
                <>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Remise</Typography>
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
                <Typography variant="h6" fontWeight={600}>Total</Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {calculateTotalPrice().toFixed(2)} DH
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleOrder}
          variant="contained"
          disabled={!time}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4
          }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDialog;