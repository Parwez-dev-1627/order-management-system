import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  IconButton,
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
  // ...existing code...
  Avatar,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
// ...existing code...
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import apiService from "../../services/ApiService";

// Enhanced Orders Data combining both structures

const getStatusChip = (status: string) => {
  if (!status) {
    return <Chip label="Unknown" size="small" color="default" />;
  }
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
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Handler functions and variables
  const handleAddOrder = () => navigate("/orders/add");
  const { status } = useParams<{ status: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  // ...existing code...

  useEffect(() => {
    apiService.getAllOrders()
      .then(data => {
        setOrders(data);
      })
      .catch(() => {});
  }, []);

  // Handler functions
  // Handler functions
  const handleEditOrder = (order: any) => navigate(`/orders/edit/${order.orderId}`);
  const handleDeleteOrder = async (orderId: number) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await apiService.deleteOrder(orderId);
    setOrders(orders.filter(o => o.orderId !== orderId));
    } catch {
      alert("Failed to delete order");
    }
    // ...existing code...
  };

  // Filter Orders by status if applicable
  let filteredOrders = orders;
  if (status && status !== "all") {
    filteredOrders = orders.filter(
      (order) => order.status && order.status.toLowerCase() === status.toLowerCase()
    );
  }

  // Pagination slice
  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Calculate summary statistics
  const pendingCount = orders.filter(order => order.status === "pending").length;
  const inProgressCount = orders.filter(order => order.status === "in progress").length;
  const completedCount = orders.filter(order => order.status === "completed").length;
  const cancelledCount = orders.filter(order => order.status === "cancelled").length;

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
          onClick={handleAddOrder}
        >
          Add New Order
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid>
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
        <Grid>
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
        <Grid>
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
        <Grid>
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
      {/* ...rest of the component... */}
      {/* Orders Table with Pagination */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Shop</TableCell>
              <TableCell>PO No</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.orderId}>
                <TableCell>{order.orderId}</TableCell>
                <TableCell>{order.shop}</TableCell>
                <TableCell>{order.poNo}</TableCell>
                <TableCell>{getStatusChip(order.status)}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditOrder(order)} title="Edit Order">
                    <EditIcon />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => handleDeleteOrder(order.orderId)} title="Delete Order">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={e => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>
    </Box>
  );
}
