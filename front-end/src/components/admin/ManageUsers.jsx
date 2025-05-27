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
  Box,
  IconButton,
  Stack,
  Alert,
  MenuItem,
  InputAdornment,
  Fade,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({ username: "", role: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("Erreur lors du chargement des utilisateurs");
      console.error("Erreur:", error);
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editUser) {
        const updateData = { username: form.username, role: form.role };
        if (form.password && form.password.trim() !== "") {
          updateData.password = form.password;
        }
        await axios.put(
          `http://localhost:5000/api/users/${editUser._id}`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Utilisateur modifié avec succès");
      } else {
        await axios.post(
          "http://localhost:5000/api/users/register",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess("Utilisateur créé avec succès");
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      setError("Erreur lors de l'enregistrement");
      console.error("Erreur:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }
    
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Utilisateur supprimé avec succès");
      fetchUsers();
    } catch (error) {
      setError("Erreur lors de la suppression");
      console.error("Erreur:", error);
    }
  };

  const handleOpen = (user = null) => {
    setEditUser(user);
    setForm(
      user
        ? { username: user.username, role: user.role, password: "" }
        : { username: "", role: "user", password: "" }
    );
    setOpen(true);
    setError("");
  };

  const handleClose = () => {
    setOpen(false);
    setEditUser(null);
    setForm({ username: "", role: "user", password: "" });
    setShowPassword(false);
    setError("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={600}>
          Gestion des Utilisateurs
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
          }}
        >
          Nouvel Utilisateur
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Utilisateur</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} hover>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {user.role === 'admin' ? <AdminIcon color="primary" /> : <PersonIcon />}
                    {user.username}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: user.role === 'admin' ? 'primary.light' : 'grey.100',
                      color: user.role === 'admin' ? 'primary.dark' : 'text.secondary',
                    }}
                  >
                    {user.role}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(user)}
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(user._id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle>
          {editUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Stack spacing={3}>
            <TextField
              label="Nom d'utilisateur"
              fullWidth
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              label="Rôle"
              fullWidth
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AdminIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="user">Utilisateur</MenuItem>
              <MenuItem value="admin">Administrateur</MenuItem>
            </TextField>

            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              helperText={editUser ? "Laisser vide pour ne pas modifier" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ 
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
            }}
          >
            {editUser ? "Enregistrer" : "Créer"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}