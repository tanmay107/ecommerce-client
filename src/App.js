import { Navbar, Products, Cart } from './components';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import Dashboard from "./components/Auth/Dashboard";
import Demo from "./components/Auth/Demo";
import Checkout from "./components/Checkout/Checkout";
import useAuth from './hook/useAuth';
import RegProduct from './components/RegProduct/RegProduct';
export default function App() {

  const [products, setProducts] = useState([]);
  let cartItem = [];

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>setProducts(json))
  }, [])

  const PrivateRoute = ({ children }) => {
    useAuth();
    return children;
  }


  const handleAddToCart = (product) => {
    cartItem.push(product);
  }
  
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          {/* <Route path="/demo" element={<PrivateOutlet />}>
            <Route element={<Demo />} />
          </Route> */}
          <Route
            path="/demo"
            element={
              <PrivateRoute>
                <Demo />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Products products = {products} onAddToCart = {handleAddToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart cartItem = {cartItem} />
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout/>
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/home" element={<Products products = {products} onAddToCart = {handleAddToCart} />} /> */}
          {/* <Route exact path="/cart" element = {<Cart cartItem = {cartItem} />} /> */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/addproduct" element={<RegProduct />} />
          {/* <Route exact path="/demo" element={<Demo />} /> */}
          {/* <Route exact path="/checkout" element={<Checkout/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}
