import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TableContainer,
  Grid,
  Card,
  CardContent,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

// Enhanced Orders Data combining both structures
const ordersData = [
  {
    id: 1,
    srNo: "#12345",
    PoNo: "PO56789",
    TallyPONo: "TALLY123",
    dispatch: "2023-12-12",
    billNo: "BILL789",
    entryBy: "Admin",
    distributor: "Distributor X",
    customer: "John Doe",
    Item: "Item A",
    printType: "Center",
    colour1: 1,
    colour2: 1,
    pcPerBox: 1000,
    noOfBox: 10,
    totalQty: 10000,
    paperWB: "White",
    paperGSM: 120,
    gsm: 120,
    pcSheetNoOfSheetRequired: 4,
    noOfSheets: 2500,
    printingDate: "2023-12-13",
    productionDate: "2023-12-14",
    productionQty: 10000,
    difference: 0,
    status: "completed",
    operation: "Manual",
    attribute: "Entry",
    delivery: "Standard",
    payment: "Cash on Delivery",
    address: "123 Main Street, Beijing",
    amount: "$120",
    products: [{ name: "Product A", price: "$120", qty: 1 }],
    history: [
      { date: "2023-12-10 09:00", status: "Processing", operator: "System", notes: "Order created" },
    ],
  },
  {
    id: 2,
    srNo: "#12344",
    PoNo: "PO56788",
    TallyPONo: "TALLY124",
    dispatch: "2023-12-11",
    billNo: "BILL788",
    entryBy: "Admin",
    distributor: "Distributor Y",
    customer: "Jane Smith",
    Item: "Item B",
    printType: "Side",
    colour1: 2,
    colour2: 1,
    pcPerBox: 500,
    noOfBox: 2,
    totalQty: 1000,
    paperWB: "White",
    paperGSM: 100,
    gsm: 100,
    pcSheetNoOfSheetRequired: 2,
    noOfSheets: 500,
    printingDate: "2023-12-11",
    productionDate: "2023-12-12",
    productionQty: 1000,
    difference: 0,
    status: "pending",
    operation: "Manual",
    attribute: "Master - 1",
    delivery: "Express",
    payment: "Credit Card",
    address: "789 West Road, Shanghai",
    amount: "$80",
    products: [{ name: "Product B", price: "$80", qty: 1 }],
    history: [
      { date: "2023-12-09 12:30", status: "Processing", operator: "System", notes: "Order created" },
      { date: "2023-12-09 16:00", status: "Shipped", operator: "John Doe", notes: "Order shipped via Express" },
    ],
  },
  {
    id: 3,
    srNo: "#12343",
    PoNo: "PO56787",
    TallyPONo: "TALLY125",
    dispatch: "2023-12-10",
    billNo: "BILL787",
    entryBy: "Admin",
    distributor: "Distributor Z",
    customer: "Michael Brown",
    Item: "Item C",
    printType: "Full",
    colour1: 1,
    colour2: 0,
    pcPerBox: 200,
    noOfBox: 5,
    totalQty: 1000,
    paperWB: "White",
    paperGSM: 150,
    gsm: 150,
    pcSheetNoOfSheetRequired: 5,
    noOfSheets: 200,
    printingDate: "2023-12-10",
    productionDate: "2023-12-11",
    productionQty: 1000,
    difference: 0,
    status: "cancelled",
    operation: "Auto",
    attribute: "Entry",
    delivery: "Express",
    payment: "Credit Card",
    address: "456 Park Avenue, Shanghai",
    amount: "$50",
    products: [
      { name: "Product D", price: "$30", qty: 1 },
      { name: "Product B", price: "$20", qty: 1 },
    ],
    history: [
      { date: "2023-12-08 10:30", status: "Processing", operator: "System", notes: "Order created" },
      { date: "2023-12-08 14:45", status: "Shipped", operator: "John Doe", notes: "Order shipped via Express delivery" },
      { date: "2023-12-09 11:20", status: "Delivered", operator: "System", notes: "Order delivered" },
      { date: "2023-12-09 15:30", status: "Cancelled", operator: "Jane Smith", notes: "Order cancelled by customer" },
    ],
  },
  {
    id: 4,
    srNo: "#12342",
    PoNo: "PO56786",
    TallyPONo: "TALLY126",
    dispatch: "2023-12-09",
    billNo: "BILL786",
    entryBy: "Admin",
    distributor: "Distributor X",
    customer: "Emily Johnson",
    Item: "Item D",
    printType: "Center",
    colour1: 1,
    colour2: 1,
    pcPerBox: 500,
    noOfBox: 4,
    totalQty: 2000,
    paperWB: "White",
    paperGSM: 120,
    gsm: 120,
    pcSheetNoOfSheetRequired: 4,
    noOfSheets: 500,
    printingDate: "2023-12-10",
    productionDate: "2023-12-11",
    productionQty: 2000,
    difference: 0,
    status: "pending",
    operation: "Manual",
    attribute: "Entry",
    delivery: "Standard",
    payment: "Cash on Delivery",
    address: "123 Main Street, Beijing",
    amount: "$200",
    products: [{ name: "Product D", price: "$200", qty: 1 }],
    history: [
      { date: "2023-12-08 09:15", status: "Processing", operator: "System", notes: "Order created" },
    ],
  },
  {
    id: 5,
    srNo: "#12341",
    PoNo: "PO56785",
    TallyPONo: "TALLY127",
    dispatch: "2023-12-08",
    billNo: "BILL785",
    entryBy: "Admin",
    distributor: "Distributor Y",
    customer: "David Wilson",
    Item: "Item E",
    printType: "Side",
    colour1: 2,
    colour2: 0,
    pcPerBox: 300,
    noOfBox: 5,
    totalQty: 1500,
    paperWB: "White",
    paperGSM: 100,
    gsm: 100,
    pcSheetNoOfSheetRequired: 3,
    noOfSheets: 500,
    printingDate: "2023-12-09",
    productionDate: "2023-12-10",
    productionQty: 1500,
    difference: 0,
    status: "completed",
    operation: "Auto",
    attribute: "Master - 2",
    delivery: "Express",
    payment: "Credit Card",
    address: "789 West Road, Shanghai",
    amount: "$150",
    products: [{ name: "Product E", price: "$150", qty: 1 }],
    history: [
      { date: "2023-12-07 11:20", status: "Processing", operator: "System", notes: "Order created" },
      { date: "2023-12-07 15:45", status: "Shipped", operator: "John Doe", notes: "Order shipped via Express" },
      { date: "2023-12-08 10:30", status: "Delivered", operator: "System", notes: "Order delivered" },
      { date: "2023-12-08 14:15", status: "Completed", operator: "Jane Smith", notes: "Order marked completed" },
    ],
  },
];

const getStatusChip = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <Chip label="Completed" color="success" size="small" />;
    case "pending":
      return <Chip label="Pending" color="warning" size="small" />;
    case "in progress":
      return <Chip label="In Progress" color="info" size="small" />;
    case "cancelled":
      return <Chip label="Cancelled" color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

export default function Orders() {
  const { status } = useParams<{ status: string }>();
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Filter Orders by status if applicable
  let filteredOrders = ordersData;
  if (status && status !== "all") {
    filteredOrders = ordersData.filter(
      (order) => order.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Calculate summary statistics
  const pendingCount = ordersData.filter(order => order.status === "pending").length;
  const inProgressCount = ordersData.filter(order => order.status === "in progress").length;
  const completedCount = ordersData.filter(order => order.status === "completed").length;
  const cancelledCount = ordersData.filter(order => order.status === "cancelled").length;

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Order Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/orders/add")}
        >
          Add New Order
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid >
          <Card sx={{ borderLeft: 4, borderColor: "warning.main", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                <AssignmentIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Pending Orders</Typography>
                <Typography variant="h5">{pendingCount}</Typography>
                <Typography variant="body2" color="success.main">↑ 3 new today</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid >
          <Card sx={{ borderLeft: 4, borderColor: "info.main", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                <AutorenewIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">In Progress Orders</Typography>
                <Typography variant="h5">{inProgressCount}</Typography>
                <Typography variant="body2" color="success.main">↑ 5 new today</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid >
          <Card sx={{ borderLeft: 4, borderColor: "success.main", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <CheckCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Completed Orders</Typography>
                <Typography variant="h5">{completedCount}</Typography>
                <Typography variant="body2" color="success.main">↑ 12% from last month</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid >
          <Card sx={{ borderLeft: 4, borderColor: "error.main", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
                <CancelIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" color="text.secondary">Cancelled Orders</Typography>
                <Typography variant="h5">{cancelledCount}</Typography>
                <Typography variant="body2" color="error.main">↓ 2 from last week</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search & Filter */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          placeholder="Search orders..."
          size="small"
          InputProps={{ endAdornment: (<IconButton><SearchIcon /></IconButton>) }}
          sx={{ mr: 1 }}
        />
        <IconButton color="primary">
          <FilterAltIcon />
        </IconButton>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/orders/details/${order.id}`)}
                >
                  <TableCell>{order.srNo}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{getStatusChip(order.status)}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <IconButton color="primary" onClick={() => setSelectedOrder(order)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="success"><EditIcon /></IconButton>
                    <IconButton color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No {status} orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)} maxWidth="md" fullWidth>
        {selectedOrder && (
          <>
            <DialogTitle>Order Details</DialogTitle>
            <DialogContent dividers>
              {/* Header */}
              <Box mb={2} display="flex" justifyContent="space-between">
                <Box>
                  <Typography><b>Order Number:</b> {selectedOrder.srNo}</Typography>
                  <Typography><b>Customer:</b> {selectedOrder.customer}</Typography>
                  <Typography><b>Order Date:</b> {selectedOrder.dispatch}</Typography>
                  <Typography><b>Status:</b> {getStatusChip(selectedOrder.status)}</Typography>
                </Box>
                <Box>
                  <Typography><b>PO Number:</b> {selectedOrder.PoNo}</Typography>
                  <Typography><b>Delivery Method:</b> {selectedOrder.delivery}</Typography>
                  <Typography><b>Payment Method:</b> {selectedOrder.payment}</Typography>
                  <Typography><b>Total Amount:</b> {selectedOrder.amount}</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Products */}
              <Typography variant="h6">Order Products</Typography>
              <Table size="small" sx={{ mb: 2 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Unit Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.products.map((p: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.price}</TableCell>
                      <TableCell>{p.qty}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Divider sx={{ my: 2 }} />

              {/* Shipping */}
              <Typography variant="h6">Shipping Information</Typography>
              <Typography>{selectedOrder.address}</Typography>

              <Divider sx={{ my: 2 }} />

              {/* History */}
              <Typography variant="h6">Order History</Typography>
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
                  {selectedOrder.history.map((h: any, i: number) => (
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
              <Button onClick={() => setSelectedOrder(null)}>Close</Button>
              <Button variant="contained" color="primary">View Invoice</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}