import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/ApiService";

// Remove sampleData since we're using real API data

const getStatusChip = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <Chip label="Completed" color="success" size="small" />;
    case "pending":
      return <Chip label="Pending" color="warning" size="small" />;
    case "cancelled":
      return <Chip label="Cancelled" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiService.getAllOrders()
      .then((data) => {
        console.log('Fetched dashboard orders:', data);
     //   setOrders(data || []); // Ensure we always have an array
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard orders:', err);
        setError(err.message);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading orders...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Failed to load orders: {error}
      </Alert>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {orders.length === 0 ? (
        <Alert severity="info">
          No orders found. 
          {error ? " There was an error loading orders." : " Create your first order to get started."}
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/orders/details/${order.id}`)}
                >
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    {/* Adjust based on your API response structure */}
                    {order.customerName || order.customer?.name || `Customer ${order.id}`}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(order.status || "pending")}
                  </TableCell>
                  <TableCell>
                    {/* Format based on your API response */}
                    {order.totalAmount ? `$${order.totalAmount}` : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}