import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';

function App() {
  return (
    <Routes>
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;
