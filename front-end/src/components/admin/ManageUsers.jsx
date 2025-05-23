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
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ username: "", role: "", password: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  // CREATE or UPDATE
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editUser) {
        // UPDATE (n'ajoute password QUE s'il est non vide)
        const updateData = { username: form.username, role: form.role };
        if (form.password && form.password.trim() !== "") {
          updateData.password = form.password;
        }
        await axios.put(
          `http://localhost:5000/api/users/${editUser._id}`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // CREATE (envoyer le password)
        await axios.post(
          "http://localhost:5000/api/users/register",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchUsers();
      setOpen(false);
      setEditUser(null);
      setForm({ username: "", role: "", password: "" });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleOpen = (user = null) => {
    setEditUser(user);
    setForm(
      user
        ? { username: user.username, role: user.role, password: "" }
        : { username: "", role: "", password: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
    setForm({ username: "", role: "", password: "" });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Liste des utilisateurs
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Ajouter un utilisateur
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom d'utilisateur</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleOpen(user)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleDelete(user._id)}
                    sx={{ ml: 1 }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour Ajouter/Modifier */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nom d'utilisateur"
            fullWidth
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Rôle"
            fullWidth
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Mot de passe"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            helperText={editUser ? "Laisser vide pour ne pas changer le mot de passe" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave} variant="contained">
            {editUser ? "Enregistrer" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
