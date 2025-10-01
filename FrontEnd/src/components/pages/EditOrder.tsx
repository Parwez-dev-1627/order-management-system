import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../services/ApiService';
import { Stack, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


type Order = {
  orderId: number;
  shop: string;
  poNo: string;
  poDate: string;
  tallyPoNo: string;
  distributorId: number;
  customerId: number;
  entryBy: number;
  remark: string;
  status?: string;
  createdAt?: string;
};

interface EditOrderProps {
  id: number;
  showNotification?: (message: string, severity?: "success" | "error" | "info" | "warning") => void;
  onSuccess?: () => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ id, showNotification, onSuccess }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    apiService.getOrderById(Number(id))
      .then((data: Order) => {
        setOrder({
          ...data,
          poDate: data.poDate ? data.poDate.substring(0, 10) : '',
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrder((prev) => prev ? { ...prev, [name]: value } : prev);
    setFieldErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    setOrder((prev) => prev ? { ...prev, status: value } : prev);
    setFieldErrors((prev) => ({ ...prev, status: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;
    const errors: { [key: string]: string } = {};
    if (!order.shop) errors.shop = 'Shop is required.';
    if (!order.poNo) errors.poNo = 'PO No is required.';
    if (!order.poDate || order.poDate === '0001-01-01' || order.poDate === '0001-01-01T00:00:00.000Z') errors.poDate = 'PO Date is required and must be valid.';
    if (!order.distributorId || order.distributorId <= 0) errors.distributorId = 'Distributor ID is required and must be > 0.';
    if (!order.customerId || order.customerId <= 0) errors.customerId = 'Customer ID is required and must be > 0.';
    if (!order.entryBy || order.entryBy <= 0) errors.entryBy = 'Entry By is required and must be > 0.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    // Prepare payload (exclude orderId, createdAt)
    const { orderId, createdAt, ...payload } = order;
    let poDate = payload.poDate;
    if (poDate && poDate.length === 10) {
      poDate = new Date(poDate).toISOString();
    }
    const updatePayload = { ...payload, poDate, status: payload.status };
    apiService.updateOrder(Number(id), updatePayload)
      .then(() => {
        if (showNotification) showNotification('Order updated successfully', 'success');
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        if (showNotification) showNotification('Failed to update order', 'error');
      });
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!order) return null;

  return (
    <div>
      <Stack spacing={2} sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
        <Typography variant="h5">Edit Order</Typography>
        <TextField
          label="Shop"
          name="shop"
          value={order.shop || ''}
          onChange={handleChange}
          required
          error={!!fieldErrors.shop}
          helperText={fieldErrors.shop}
        />
        <TextField
          label="PO No"
          name="poNo"
          value={order.poNo || ''}
          onChange={handleChange}
          required
          error={!!fieldErrors.poNo}
          helperText={fieldErrors.poNo}
        />
        <TextField
          label="PO Date"
          name="poDate"
          type="date"
          value={order.poDate || ''}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
          error={!!fieldErrors.poDate}
          helperText={fieldErrors.poDate}
        />
        <TextField
          label="Tally PO No"
          name="tallyPoNo"
          value={order.tallyPoNo || ''}
          onChange={handleChange}
        />
        <TextField
          label="Distributor ID"
          name="distributorId"
          type="number"
          value={order.distributorId || ''}
          onChange={handleChange}
          required
          error={!!fieldErrors.distributorId}
          helperText={fieldErrors.distributorId}
        />
        <TextField
          label="Customer ID"
          name="customerId"
          type="number"
          value={order.customerId || ''}
          onChange={handleChange}
          required
          error={!!fieldErrors.customerId}
          helperText={fieldErrors.customerId}
        />
        <TextField
          label="Entry By"
          name="entryBy"
          type="number"
          value={order.entryBy || ''}
          onChange={handleChange}
          error={!!fieldErrors.entryBy}
          helperText={fieldErrors.entryBy}
        />
        <TextField
          label="Remark"
          name="remark"
          value={order.remark || ''}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={order.status || "New"}
            onChange={handleStatusChange}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit}>Update Order</Button>
      </Stack>
    </div>
  );
};

export default EditOrder;
