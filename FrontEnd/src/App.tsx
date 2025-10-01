
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, Snackbar, Alert } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import Customers from "./components/pages/Customers";
import Reports from "./components/pages/Reports";
import OrderDetails from "./components/pages/OrderDetails";
import AddOrder from "./components/pages/AddOrder";
import EditOrder from "./components/pages/EditOrder";
import BreadcrumbsNav from "./components/BreadcrumbsNav";

export default function App() {
  const [notification, setNotification] = React.useState<{ message: string; severity: "success" | "error" | "info" | "warning" } | null>(null);
  const [open, setOpen] = React.useState(false);

  const showNotification = (message: string, severity: "success" | "error" | "info" | "warning" = "info") => {
    setNotification({ message, severity });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Provide notification context to children
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Breadcrumbs */}
          <BreadcrumbsNav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders/:status" element={<Orders showNotification={showNotification} />} />
            <Route path="/orders/details/:id" element={<OrderDetails />} />
            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity={notification?.severity || 'info'} sx={{ width: '100%' }}>
              {notification?.message || ''}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Router>
  );
}
