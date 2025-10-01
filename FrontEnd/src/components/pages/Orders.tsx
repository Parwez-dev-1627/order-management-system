import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import apiService from "../../services/ApiService";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";



interface OrdersProps {
  showNotification?: (message: string, severity?: "success" | "error" | "info" | "warning") => void;
}

const Orders: React.FC<OrdersProps> = ({ showNotification }) => {
  const { status } = useParams<{ status: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState<number | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    apiService.getAllOrders()
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err);
        setOrders([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  let filteredOrders = orders;
  if (status && status !== "all") {
    if (status.toLowerCase() === "pending") {
      filteredOrders = orders.filter((order: any) => order.status && (order.status.toLowerCase() === "pending" || order.status.toLowerCase() === "new"));
    } else if (status.toLowerCase() === "completed") {
      filteredOrders = orders.filter((order: any) => order.status && order.status.toLowerCase() === "completed");
    } else {
      filteredOrders = orders.filter((order: any) => order.status && order.status.toLowerCase() === status.toLowerCase());
    }
  }
  // Sort by orderId descending
  filteredOrders = [...filteredOrders].sort((a, b) => a.orderId-b.orderId);

  // Delete handler for orders
  const handleDeleteOrder = (orderId: number) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      apiService.deleteOrder(orderId)
        .then(() => {
          setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
          if (showNotification) showNotification('Order deleted successfully', 'success');
        })
        .catch((err) => {
          console.error("Failed to delete order:", err);
          if (showNotification) showNotification('Failed to delete order', 'error');
        });
    }
  }

  // Dialog handlers
  const handleOpenAddDialog = () => setAddDialogOpen(true);
  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    fetchOrders();
    navigate('/orders/all');
  };
  const handleOpenEditDialog = (orderId: number) => {
    setEditOrderId(orderId);
    setEditDialogOpen(true);
  };
  // Use a separate handler for dialog close (event signature)
  const handleDialogClose = (_event?: {}, _reason?: "backdropClick" | "escapeKeyDown") => {
    setEditDialogOpen(false);
    setEditOrderId(null);
    navigate('/orders/all');
  };
  // Use this for successful update
  const handleEditSuccess = () => {
    setEditDialogOpen(false);
    setEditOrderId(null);
    fetchOrders();
    navigate('/orders/all');
    if (showNotification) showNotification('Order updated successfully', 'success');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {status === "all" || !status
          ? "All Orders"
          : `${status.charAt(0).toUpperCase() + status.slice(1)} Orders`}
      </Typography>

      {/* Add Order Button */}
      <div style={{ marginBottom: 16 }}>
        <button
          style={{ padding: "8px 16px", background: "#1976d2", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
          onClick={handleOpenAddDialog}
        >
          Add Order
        </button>
      </div>

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
                <TableCell>Status</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order: any) => (
                  <TableRow
                    key={order.orderId}
                    hover
                  >
                    <TableCell onClick={() => navigate(`/orders/details/${order.orderId}`)} style={{ cursor: "pointer" }}>{order.orderId}</TableCell>
                    <TableCell>{order.shop}</TableCell>
                    <TableCell>{order.poNo}</TableCell>
                    <TableCell>
                      {order.status === "Completed" ? (
                        <Chip label="Completed" style={{ backgroundColor: '#43a047', color: 'white' }} />
                      ) : order.status === "New" ? (
                        <Chip label="New" style={{ backgroundColor: '#fff9c4', color: '#333', border: '1px solid #ffe082' }} />
                      ) : (
                        <Chip label={order.status || "Pending"} style={{ backgroundColor: '#ffa726', color: 'white' }} />
                      )}
                    </TableCell>
                    <TableCell>{order.remark}</TableCell>
                    <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : ''}</TableCell>
                    <TableCell>
                      <button
                        style={{ marginRight: 8, padding: "4px 8px", background: "#ffa726", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                        onClick={() => handleOpenEditDialog(order.orderId)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ padding: "4px 8px", background: "#d32f2f", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order.orderId)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No orders found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* AddOrder Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          Add New Order
          <IconButton
            aria-label="close"
            onClick={handleCloseAddDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddOrder onSuccess={handleCloseAddDialog} showNotification={showNotification} />
        </DialogContent>
      </Dialog>
      {/* EditOrder Dialog */}
      <Dialog open={editDialogOpen} onClose={handleDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Order
          <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editOrderId && <EditOrder id={editOrderId} onSuccess={handleEditSuccess} showNotification={showNotification} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Orders;
