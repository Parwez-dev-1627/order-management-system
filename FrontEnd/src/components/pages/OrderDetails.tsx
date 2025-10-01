import React from "react";
import { useParams, Link } from "react-router-dom";
import { Typography, Paper, Chip, Button } from "@mui/material";

// Sample dataset (in real app you'd fetch this from API)
const sampleData = [
  { id: 1, customer: "John Doe", status: "completed", total: "$120" },
  { id: 2, customer: "Jane Smith", status: "pending", total: "$80" },
  { id: 3, customer: "Michael Brown", status: "cancelled", total: "$50" },
  { id: 4, customer: "Emily Johnson", status: "pending", total: "$200" },
  { id: 5, customer: "David Wilson", status: "completed", total: "$150" },
];

const getStatusChip = (status: string) => {
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
  const order = sampleData.find((o) => o.id.toString() === id);

  if (!order) {
    return <Typography variant="h6">Order not found</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
      <Typography variant="h6">Order ID: {order.id}</Typography>
      <Typography variant="h6">Customer: {order.customer}</Typography>
      <Typography variant="h6">Status: {getStatusChip(order.status)}</Typography>
      <Typography variant="h6">Total: {order.total}</Typography>

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
