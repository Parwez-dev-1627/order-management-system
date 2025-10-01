import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const drawerWidth = 240;

export default function Sidebar() {
  const [openOrders, setOpenOrders] = React.useState(false);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(to bottom, #3f51b5, #1a237e)",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <Box textAlign="center" width="100%">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            ORDER MANAGEMENT
            <br />
            SYSTEM
          </Typography>
        </Box>
      </Toolbar>

      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        {/* Orders */}
        <ListItemButton onClick={() => setOpenOrders(!openOrders)}>
          <ListItemIcon sx={{ color: "white" }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Order Management" />
          {openOrders ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openOrders} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton component={Link} to="/orders/all">
              <ListItemText primary="All Orders" />
            </ListItemButton>
            <ListItemButton component={Link} to="/orders/pending">
              <ListItemText primary="Pending Orders" />
            </ListItemButton>
            <ListItemButton component={Link} to="/orders/completed">
              <ListItemText primary="Completed Orders" />
            </ListItemButton>
            <ListItemButton component={Link} to="/orders/cancelled">
              <ListItemText primary="Cancelled Orders" />
            </ListItemButton>
          </List>
        </Collapse>

        <ListItemButton component={Link} to="/products">
          <ListItemIcon sx={{ color: "white" }}>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="Product Management" />
        </ListItemButton>

        <ListItemButton component={Link} to="/customers">
          <ListItemIcon sx={{ color: "white" }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Customer Management" />
        </ListItemButton>

        <ListItemButton component={Link} to="/reports">
          <ListItemIcon sx={{ color: "white" }}>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
