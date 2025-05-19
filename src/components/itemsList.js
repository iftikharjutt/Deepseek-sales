import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching items:', err);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Inventory Items</Typography>
      <Button variant="contained" color="primary" component={Link} to="/items/new" sx={{ mb: 3 }}>
        Add New Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${item.cost.toFixed(2)}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/items/edit/${item._id}`} size="small">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ItemsList;