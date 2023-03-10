import React from 'react';
import './App.css';

import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import AdminManage from './pages/AdminManage';
import Products from './pages/Products';
import CheckoutOrders from './pages/CustomerOrders';
import SellerOrders from './pages/SellerOrders';
import SellerOrdersDetails from './pages/SellerOrdersDetails';
import UserOrders from './pages/UserOrders';

function App() {
  return (
    <Routes>
      <Route exact path="/admin/manage" element={ <AdminManage /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders/:id" element={ <CheckoutOrders /> } />
      <Route exact path="/customer/orders/" element={ <UserOrders /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/seller/orders/:id" element={ <SellerOrdersDetails /> } />
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/" element={ <Home /> } />
    </Routes>
  );
}

export default App;
