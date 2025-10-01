
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import BreadcrumbsNav from "./components/BreadcrumbsNav";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/pages/Dashboard";
import Orders from "./components/pages/Orders";
import Products from "./components/pages/Products";
import Customers from "./components/pages/Customers";
import Reports from "./components/pages/Reports";
import OrderDetails from "./components/pages/OrderDetails";

import AddOrder from "./components/pages/AddOrder";

export default function App() {
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
            <Route path="/orders/:status" element={<Orders />} />
            <Route path="/orders/details/:id" element={<OrderDetails />} />
            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
