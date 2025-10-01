import React, { useState } from "react";
import { TextField, Button, Stack, Typography } from "@mui/material";
import apiService from "../../services/ApiService";

interface AddOrderProps {
  onSuccess?: () => void;
  showNotification?: (message: string, severity?: "success" | "error" | "info" | "warning") => void;
}

const AddOrder: React.FC<AddOrderProps> = ({ onSuccess, showNotification }) => {
    const [form, setForm] = useState({
      shop: "",
      poNo: "",
      poDate: new Date().toISOString().substring(0, 10),
      tallyPoNo: "",
      distributorId: "",
      customerId: "",
      entryBy: "",
      remark: "",
      status: "New"
    });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: any = value;
    if (["distributorId", "customerId", "entryBy"].includes(name)) {
      newValue = value === "" ? "" : value.replace(/[^0-9]/g, "");
    }
    if (name === "poDate") {
      newValue = value;
    }
    setForm({ ...form, [name]: newValue });
    setFieldErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!form.shop) errors.shop = 'Shop is required.';
    if (!form.poNo) errors.poNo = 'PO No is required.';
    if (!form.poDate || form.poDate === '0001-01-01' || form.poDate === '0001-01-01T00:00:00.000Z') errors.poDate = 'PO Date is required and must be valid.';
  if (!form.distributorId || Number(form.distributorId) <= 0) errors.distributorId = 'Distributor ID is required and must be > 0.';
  if (!form.customerId || Number(form.customerId) <= 0) errors.customerId = 'Customer ID is required and must be > 0.';
  if (!form.entryBy || Number(form.entryBy) <= 0) errors.entryBy = 'Entry By is required and must be > 0.';
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
    const { shop, poNo, poDate, tallyPoNo, distributorId, customerId, entryBy, remark, status } = form;
  const payload = { shop, poNo, poDate: new Date(poDate).toISOString(), tallyPoNo, distributorId: Number(distributorId), customerId: Number(customerId), entryBy: Number(entryBy), remark, status };
  await apiService.createOrder(payload);
  if (showNotification) showNotification('Order added successfully', 'success');
  if (onSuccess) onSuccess();
    } catch (err) {
      // Optionally set a general error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Stack spacing={2} sx={{ maxWidth: 500, margin: 'auto', mt: 2 }}>
  <TextField label="Shop" name="shop" value={form.shop} onChange={handleChange} fullWidth required error={!!fieldErrors.shop} helperText={fieldErrors.shop} />
  <TextField label="PO No" name="poNo" value={form.poNo} onChange={handleChange} fullWidth required error={!!fieldErrors.poNo} helperText={fieldErrors.poNo} />
  <TextField label="PO Date" name="poDate" type="date" value={form.poDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} error={!!fieldErrors.poDate} helperText={fieldErrors.poDate} />
        <TextField label="Tally PO No" name="tallyPoNo" value={form.tallyPoNo} onChange={handleChange} fullWidth />
  <TextField label="Distributor ID" name="distributorId" type="number" value={form.distributorId} onChange={handleChange} fullWidth required error={!!fieldErrors.distributorId} helperText={fieldErrors.distributorId} />
  <TextField label="Customer ID" name="customerId" type="number" value={form.customerId} onChange={handleChange} fullWidth required error={!!fieldErrors.customerId} helperText={fieldErrors.customerId} />
  <TextField label="Entry By" name="entryBy" type="number" value={form.entryBy} onChange={handleChange} fullWidth required error={!!fieldErrors.entryBy} helperText={fieldErrors.entryBy} />
        <TextField label="Remark" name="remark" value={form.remark} onChange={handleChange} fullWidth />
        {/* Per-field errors are now shown via helperText on each TextField */}
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Adding..." : "Add Order"}
        </Button>
      </Stack>
    </div>
  );
}

export default AddOrder;
