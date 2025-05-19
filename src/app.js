import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ItemsList from './components/ItemsList';
import ItemForm from './components/ItemForm';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/items" element={<ItemsList />} />
          <Route path="/items/new" element={<ItemForm />} />
          <Route path="/items/edit/:id" element={<ItemForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;