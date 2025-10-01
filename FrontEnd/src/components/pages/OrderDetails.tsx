import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Paper, Chip, Button } from "@mui/material";
import apiService from "../../services/ApiService";

// ...existing code...

const getStatusChip = (status?: string) => {
  if (!status) return <Chip label="Unknown" />;
  switch (status.toLowerCase()) {
    case "completed":
      return <Chip label="Completed" color="success" />;
    case "pending":
      return <Chip label="Pending" color="warning" />;
    case "cancelled":
      return <Chip label="Cancelled" color="error" />;
    default:
      return <Chip label={status} />;
  }
};

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      apiService.getOrderById(Number(id))
        .then((data) => {
          setOrder(data);
        })
        .catch((err) => {
          console.error('Failed to fetch order details:', err);
          setOrder(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!order) {
    return <Typography variant="h6">Order not found.</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
  <Typography variant="h6">Order ID: {order.orderId}</Typography>
  <Typography variant="h6">Shop: {order.shop}</Typography>
  <Typography variant="h6">PO No: {order.poNo}</Typography>
  <Typography variant="h6">Remark: {order.remark}</Typography>
  <Typography variant="h6">Created At: {order.createdAt}</Typography>

      <Button
        variant="contained"
        component={Link}
        to="/orders"
        sx={{ mt: 2 }}
      >
        Back to Orders
      </Button>
    </Paper>
  );
}
