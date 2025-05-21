import React, { useState } from 'react';
import jwtDecode from "jwt-decode";


import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        username,
        password,
      });
  
      const token = response.data.token;
      localStorage.setItem("token", token);
  
      const decoded = jwtDecode(token);
      const role = decoded.role;
  
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={6} sx={{ padding: 4, mt: 8, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'green', mb: 2 }}>
            <RestaurantIcon />
          </Avatar>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Connexion - MealHub
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Bienvenue, connectez-vous pour réserver vos repas 🍽️
          </Typography>
          <Box component="form" onSubmit={handleSubmit} width="100%">
            <TextField
              margin="normal"
              fullWidth
              label="Nom d'utilisateur"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Mot de passe"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" mt={1}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Se connecter
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
