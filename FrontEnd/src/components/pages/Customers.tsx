import React, { useEffect, useState } from "react";
import { Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, TableContainer } from "@mui/material";
import apiService from "../../services/ApiService";

export default function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAllCustomers()
      .then((data) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.error('Failed to fetch customers:', err);
        setCustomers([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Customer Management</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Distributor ID</TableCell>
                <TableCell>Address ID</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <TableRow key={customer.customerId}>
                    <TableCell>{customer.customerId}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.contactNo}</TableCell>
                    <TableCell>{customer.distributorId}</TableCell>
                    <TableCell>{customer.addressId}</TableCell>
                    <TableCell>{customer.inactive ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <button style={{ marginRight: 8, padding: "4px 8px", background: "#ffa726", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => alert('Edit Customer ' + customer.customerId)}>Edit</button>
                      <button style={{ padding: "4px 8px", background: "#d32f2f", color: "white", border: "none", borderRadius: 4, cursor: "pointer" }} onClick={() => alert('Delete Customer ' + customer.customerId)}>Delete</button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No customers found.
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
