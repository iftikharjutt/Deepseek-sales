import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [item, setItem] = useState({
    name: '',
    description: '',
    category: '',
    supplier: '',
    price: 0,
    cost: 0,
    quantity: 0,
    reorderLevel: 5,
    sku: '',
    barcode: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories and suppliers
        const [catRes, supRes] = await Promise.all([
          axios.get('http://localhost:5000/api/categories'),
          axios.get('http://localhost:5000/api/suppliers')
        ]);
        setCategories(catRes.data);
        setSuppliers(supRes.data);

        // If editing, fetch the item
        if (id) {
          const itemRes = await axios.get(`http://localhost:5000/api/items/${id}`);
          setItem(itemRes.data);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/items/${id}`, item);
      } else {
        await axios.post('http://localhost:5000/api/items', item);
      }
      navigate('/items');
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Item' : 'Add New Item'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="SKU"
              name="sku"
              value={item.sku}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={3}
              value={item.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={item.category}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Supplier</InputLabel>
              <Select
                name="supplier"
                value={item.supplier}
                onChange={handleChange}
                required
              >
                {suppliers.map(sup => (
                  <MenuItem key={sup._id} value={sup._id}>{sup.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={item.price}
              onChange={handleChange}
              required
              inputProps={{ step: "0.01" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Cost"
              name="cost"
              type="number"
              value={item.cost}
              onChange={handleChange}
              required
              inputProps={{ step: "0.01" }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              type="number"
              value={item.quantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ItemForm;