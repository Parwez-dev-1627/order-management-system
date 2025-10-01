import { ArrowBack, CheckCircle } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import apiService from "../../services/ApiService";

export default function EditOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    orderId: 0,
    shop: "",
    poNo: "",
    poDate: "",
    tallyPoNo: "",
    distributorId: 0,
    customerId: 0,
    entryBy: 0,
    remark: "",
    status: "pending",
    createdAt: "",
  });
  const [successOpen, setSuccessOpen] = useState(false);
  useEffect(() => {
    if (!id) return;
    apiService.getOrderById(Number(id)).then((data: any) => {
      setForm((prev) => ({
        ...prev,
        ...data,
        poDate: data.poDate ? data.poDate.substring(0, 10) : "",
        createdAt: data.createdAt ? data.createdAt.substring(0, 10) : "",
      }));
    });
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  const handleSelect = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Prepare payload for backend
    const { createdAt, ...rest } = form;
    const payload = {
      ...rest,
      poDate: form.poDate ? new Date(form.poDate).toISOString() : undefined,
    };
    apiService.updateOrder(Number(id), payload).then(() => {
  setSuccessOpen(true);
    });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Edit Order</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/orders/all")}
        >
          Back to Orders
        </Button>
      </Box>
      <Card>
        <CardHeader title="Order Information" />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box display="flex" gap={2}>
              <TextField label="Order ID" name="orderId" value={form.orderId} disabled fullWidth />
              <TextField label="Shop" name="shop" value={form.shop} onChange={handleChange} fullWidth required />
            </Box>
            <Box display="flex" gap={2}>
              <TextField label="PO No" name="poNo" value={form.poNo} onChange={handleChange} fullWidth required />
              <TextField label="PO Date" name="poDate" type="date" value={form.poDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
            </Box>
            <Box display="flex" gap={2}>
              <TextField label="Tally PO No" name="tallyPoNo" value={form.tallyPoNo} onChange={handleChange} fullWidth />
              <TextField label="Remark" name="remark" value={form.remark} onChange={handleChange} fullWidth />
            </Box>
            <Box display="flex" gap={2}>
              <TextField label="Distributor ID" name="distributorId" type="number" value={form.distributorId} onChange={handleChange} fullWidth required />
              <TextField label="Customer ID" name="customerId" type="number" value={form.customerId} onChange={handleChange} fullWidth required />
            </Box>
            <Box display="flex" gap={2}>
              <TextField label="Entry By" name="entryBy" type="number" value={form.entryBy} onChange={handleChange} fullWidth required />
              <TextField label="Created At" name="createdAt" type="date" value={form.createdAt} disabled fullWidth InputLabelProps={{ shrink: true }} />
            </Box>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={form.status} onChange={handleSelect} required>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" onClick={() => navigate("/orders")}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">Update Order</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography>Order has been updated successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => navigate("/orders/all")}>View Orders</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
