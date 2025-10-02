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
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
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
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Drawer
      sx={{
        width: collapsed ? 60 : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: collapsed ? 60 : drawerWidth,
          boxSizing: "border-box",
          background: "#181A20",
          color: "#fff",
          transition: "width 0.3s",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 1 }}>
        <IconButton onClick={() => setCollapsed(!collapsed)} sx={{ color: "#fff" }}>
          {collapsed ? <MenuIcon /> : <ChevronLeftIcon />}
        </IconButton>
        {!collapsed && (
          <Box textAlign="center" width="100%">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              ORDER MANAGEMENT<br />SYSTEM
            </Typography>
          </Box>
        )}
      </Toolbar>
      <List>
        <ListItemButton component={Link} to="/" sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
            <DashboardIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Dashboard" />}
        </ListItemButton>
        <ListItemButton onClick={() => setOpenOrders(!openOrders)} sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
            <ShoppingCartIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Order Management" />}
          {!collapsed && (openOrders ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
        {!collapsed && (
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
        )}
        <ListItemButton component={Link} to="/products" sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
            <InventoryIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Product Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/customers" sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
            <PeopleIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Customer Management" />}
        </ListItemButton>
        <ListItemButton component={Link} to="/reports" sx={{ justifyContent: collapsed ? "center" : "flex-start" }}>
          <ListItemIcon sx={{ color: "#fff", minWidth: 0, justifyContent: "center" }}>
            <AssessmentIcon />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Reports" />}
        </ListItemButton>
      </List>
    </Drawer>
  );
}
