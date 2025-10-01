import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Divider,
} from "@mui/material";

interface OrderDetailsDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function OrderDetailsDialog({ open, onClose }: OrderDetailsDialogProps) {
  // Mock order details
  const order = {
    number: "#12343",
    customer: "Wang Wu",
    orderDate: "2023-12-08",
    completedDate: "2023-12-09",
    status: "Completed",
    deliveryMethod: "Express",
    paymentMethod: "Credit Card",
    totalAmount: "₹2,499.00",
    products: [
      { name: "Product D", price: "₹1,299.00", qty: 1, subtotal: "₹1,299.00" },
      { name: "Product B", price: "₹599.00", qty: 2, subtotal: "₹1,198.00" },
    ],
    shipping: {
      address: "456 Park Avenue, Shanghai",
      tracking: "TRK123456789",
    },
    history: [
      { date: "2023-12-08 10:30", status: "Processing", operator: "System", notes: "Order created" },
      { date: "2023-12-08 14:45", status: "Shipped", operator: "John Doe", notes: "Order shipped via Express delivery" },
      { date: "2023-12-09 11:20", status: "Delivered", operator: "System", notes: "Order delivered to customer" },
      { date: "2023-12-09 15:30", status: "Completed", operator: "Jane Smith", notes: "Order marked as completed" },
    ],
  };

  const getStatusChip = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <Chip label="Completed" color="success" size="small" />;
      case "processing":
        return <Chip label="Processing" color="warning" size="small" />;
      case "shipped":
        return <Chip label="Shipped" color="info" size="small" />;
      case "delivered":
        return <Chip label="Delivered" color="primary" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        {/* Order Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography><b>Order Number:</b> {order.number}</Typography>
            <Typography><b>Customer:</b> {order.customer}</Typography>
            <Typography><b>Order Date:</b> {order.orderDate}</Typography>
            <Typography><b>Completed Date:</b> {order.completedDate}</Typography>
          </Box>
          <Box>
            <Typography><b>Status:</b> {getStatusChip(order.status)}</Typography>
            <Typography><b>Delivery Method:</b> {order.deliveryMethod}</Typography>
            <Typography><b>Payment Method:</b> {order.paymentMethod}</Typography>
            <Typography><b>Total Amount:</b> {order.totalAmount}</Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Products Table */}
        <Typography variant="h6" gutterBottom>Order Products</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.products.map((p, i) => (
              <TableRow key={i}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.qty}</TableCell>
                <TableCell>{p.subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Divider sx={{ my: 2 }} />

        {/* Shipping Info */}
        <Typography variant="h6" gutterBottom>Shipping Information</Typography>
        <Typography><b>Address:</b> {order.shipping.address}</Typography>
        <Typography><b>Tracking Number:</b> {order.shipping.tracking}</Typography>

        <Divider sx={{ my: 2 }} />

        {/* History Table */}
        <Typography variant="h6" gutterBottom>Order History</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.history.map((h, i) => (
              <TableRow key={i}>
                <TableCell>{h.date}</TableCell>
                <TableCell>{getStatusChip(h.status)}</TableCell>
                <TableCell>{h.operator}</TableCell>
                <TableCell>{h.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" color="primary">View Invoice</Button>
      </DialogActions>
    </Dialog>
  );
}
