import React, { useEffect, useState } from "react";
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import apiService from "../../services/ApiService";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAllItemMasters()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Product Management</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item ID</TableCell>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Print Type</TableCell>
                <TableCell>Colour 1</TableCell>
                <TableCell>Colour 2</TableCell>
                <TableCell>PC/Box</TableCell>
                <TableCell>PC/Sheet</TableCell>
                <TableCell>Paper GSM</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product.itemId}>
                    <TableCell>{product.itemId}</TableCell>
                    <TableCell>{product.itemCode}</TableCell>
                    <TableCell>{product.itemName}</TableCell>
                    <TableCell>{product.printType}</TableCell>
                    <TableCell>{product.colour1}</TableCell>
                    <TableCell>{product.colour2}</TableCell>
                    <TableCell>{product.pcPerBox}</TableCell>
                    <TableCell>{product.pcPerSheet}</TableCell>
                    <TableCell>{product.paperGsm}</TableCell>
                    <TableCell>
                      <button style={{ marginRight: 8, padding: "4px 8px", background: "#ffa726", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => alert('Edit Product ' + product.itemId)}>Edit</button>
                      <button style={{ padding: "4px 8px", background: "#d32f2f", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => alert('Delete Product ' + product.itemId)}>Delete</button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
