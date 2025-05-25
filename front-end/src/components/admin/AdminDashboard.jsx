import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptIcon from "@mui/icons-material/Receipt";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout"; // Ajoute l'icône de déconnexion
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importe useNavigate
import ManageUsers from "./ManageUsers";
import ManageMeals from "./ManageMeals";
import ManageOrders from "./ManageOrders";

const drawerWidth = 240;

export default function AdminDashboard() {
  const [selectedSection, setSelectedSection] = useState("users");
  const navigate = useNavigate(); // Utilise useNavigate pour la redirection

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/"); // Redirige vers la page de connexion
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "users":
        return <ManageUsers />;
      case "meals":
        return <ManageMeals />;
      case "orders":
        return <ManageOrders />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "#388e3c" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}> {/* Ajout de flexbox pour positionner */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              EPG MealHub - Admin
            </Typography>
          </Box>
          
          {/* Bouton de déconnexion */}
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ fontWeight: 500 }}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#f1f8e9",
          },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setSelectedSection("users")}>
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Utilisateurs" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection("meals")}>
            <ListItemIcon><RestaurantIcon /></ListItemIcon>
            <ListItemText primary="Repas" />
          </ListItem>
          <ListItem button onClick={() => setSelectedSection("orders")}>
            <ListItemIcon><ReceiptIcon /></ListItemIcon>
            <ListItemText primary="Commandes" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#fafafa", minHeight: "100vh" }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
