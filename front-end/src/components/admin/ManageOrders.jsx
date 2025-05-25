import { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/commandes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement des commandes :", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Liste des commandes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom du client</TableCell>
              <TableCell>Repas</TableCell>
              <TableCell>Quantité</TableCell>
              <TableCell>Prix</TableCell> {/* Nouvelle colonne */}
              <TableCell>Temps prévu</TableCell> {/* Nouvelle colonne */}
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.userId?.username || "Utilisateur inconnu"}</TableCell>
                <TableCell>{order.mealId?.name || "Repas inconnu"}</TableCell>
                <TableCell>{order.quantity || 1}</TableCell>
                <TableCell>{order.price ? `${order.price.toFixed(2)} DH` : "Prix inconnu"}</TableCell> {/* Affiche le prix */}
                <TableCell>{order.scheduledTime || "Temps inconnu"}</TableCell> {/* Affiche le temps prévu */}
                <TableCell>
                  {order.dateCommande
                    ? new Date(order.dateCommande).toLocaleDateString()
                    : "Date inconnue"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
