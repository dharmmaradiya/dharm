import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Navbar from './Comp/Navbar';
import Login from './Comp/Login';
import ProductList from './Comp/ProductList';
import ProductForm from './Comp/ProductFrom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<ProductForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
