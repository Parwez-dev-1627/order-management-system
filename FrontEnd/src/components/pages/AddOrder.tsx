// src/pages/AddOrder.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ArrowBack, CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function AddOrder() {
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    supplier: "",
    price: "",
    cost: "",
    quantity: "",
    minStock: "",
    maxStock: "",
    description: "",
    image: "",
    status: "active",
    featured: false,
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

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

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, featured: e.target.checked }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm((prev) => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally call API here...
    setSuccessOpen(true);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Add New Product</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/orders")}
        >
          Back to Products
        </Button>
      </Box>

      <Card>
        <CardHeader title="Product Information" />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box display="flex" gap={2}>
              <TextField
                label="Product Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Product SKU"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <Box display="flex" gap={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleSelect}
                  required
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="home-appliances">Home Appliances</MenuItem>
                  <MenuItem value="furniture">Furniture</MenuItem>
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="books">Books</MenuItem>
                  <MenuItem value="toys">Toys</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="beauty">Beauty</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Supplier</InputLabel>
                <Select
                  name="supplier"
                  value={form.supplier}
                  onChange={handleSelect}
                  required
                >
                  <MenuItem value="supplier-a">Supplier A</MenuItem>
                  <MenuItem value="supplier-b">Supplier B</MenuItem>
                  <MenuItem value="supplier-c">Supplier C</MenuItem>
                  <MenuItem value="supplier-d">Supplier D</MenuItem>
                  <MenuItem value="supplier-e">Supplier E</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="Price (₹)"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                fullWidth
                required
              />
              <TextField
                label="Cost (₹)"
                name="cost"
                type="number"
                value={form.cost}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                fullWidth
                required
              />
              <TextField
                label="Initial Stock"
                name="quantity"
                type="number"
                value={form.quantity}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <Box display="flex" gap={2}>
              <TextField
                label="Minimum Stock"
                name="minStock"
                type="number"
                value={form.minStock}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Maximum Stock"
                name="maxStock"
                type="number"
                value={form.maxStock}
                onChange={handleChange}
                fullWidth
                required
              />
            </Box>

            <TextField
              label="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />

            <Box display="flex" gap={2}>
              <Button variant="contained" component="label">
                Upload Image
                <input hidden accept="image/*" type="file" onChange={handleImage} />
              </Button>
              {form.image && (
                <Box component="img" src={form.image} alt="preview" width={100} />
              )}
            </Box>

            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={form.status}
                onChange={handleSelect}
                required
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="discontinued">Discontinued</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox checked={form.featured} onChange={handleCheckbox} />
              }
              label="Featured Product"
            />

            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                onClick={() => navigate("/orders")}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Product
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={successOpen} onClose={() => setSuccessOpen(false)}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent
          sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography>Product has been added successfully!</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessOpen(false)}>Close</Button>
          <Button variant="contained" onClick={() => navigate("/orders")}>
            View Products
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
