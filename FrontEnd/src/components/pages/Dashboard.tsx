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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../../services/ApiService";

// ...existing code...

const getStatusChip = (status?: string) => {
  if (!status) return <Chip label="Unknown" size="small" />;
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

  useEffect(() => {
    apiService.getAllOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error('Failed to fetch dashboard orders:', err);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Shop</TableCell>
                <TableCell>PO No</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/orders/details/${order.orderId}`)}
                  >
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{order.shop}</TableCell>
                    <TableCell>{order.poNo}</TableCell>
                    <TableCell>{order.remark}</TableCell>
                    <TableCell>{order.createdAt}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
