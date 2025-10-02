import React, { useEffect, useState } from "react";
import { Pie, Bar } from "../ChartExports";
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
        setOrders(data || []); // Ensure we always have an array
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

  // Chart data preparation
  const statusCounts: Record<string, number> = {};
  const statusTotals: Record<string, number> = {};
  orders.forEach(order => {
    const status = order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase() : "Unknown";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    statusTotals[status] = (statusTotals[status] || 0) + (order.totalAmount || 0);
  });

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3", "#f44336", "#bdbdbd"],
      },
    ],
  };

  const barData = {
    labels: Object.keys(statusTotals),
    datasets: [
      {
        label: "Order Total ($)",
        data: Object.values(statusTotals),
        backgroundColor: "#2196f3",
      },
    ],
  };

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
        <Box display="flex" gap={4} justifyContent="center" alignItems="flex-start" mb={4}>
          <Paper sx={{ p: 2, minWidth: 280, maxWidth: 340, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom fontSize={18}>Order Status Distribution</Typography>
            <Pie data={pieData} width={240} height={240} />
          </Paper>
          <Paper sx={{ p: 2, minWidth: 280, maxWidth: 340, height: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" gutterBottom fontSize={18}>Order Totals by Status</Typography>
            <Bar data={barData} width={240} height={240} options={{ maintainAspectRatio: true }} />
          </Paper>
        </Box>
      )}
      {/* Existing table below charts */}
      {orders.length > 0 && (
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
                    {order.customerName || order.customer?.name || order.customerId || "Unknown"}
                  </TableCell>
                  <TableCell>
                    {getStatusChip(order.status || "pending")}
                  </TableCell>
                  <TableCell>
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