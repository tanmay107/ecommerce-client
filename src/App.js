import { Navbar, Products, Cart } from './components';
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Reset from "./components/Auth/Reset";
import Dashboard from "./components/Auth/Dashboard";
import Demo from "./components/Auth/Demo";
import Checkout from "./components/Checkout/Checkout";
import useAuth from './hook/useAuth';
import RegProduct from './components/RegProduct/RegProduct';
import { addToBasket, auth, getProducts } from './components/Auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
export default function App() {

  const [user, loading, error] = useAuthState(auth);
  let cartItem = [];

  // useEffect(() => {
  //   getProducts().then(x => setProducts(x))
  // }, []); 
  
  const PrivateRoute = ({ children }) => {
    useAuth();
    return children;
  }

  const handleAddToCart = (product) => {
    product.uid = user.uid;
    cartItem.push(product);

    axios
    .post("http://localhost:4000/api/carts/update", 
      {
        uid: localStorage.getItem("uid"),
        cart: product
    }
    , {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem("accessToken"),
        Id : "mFfcxrJ9DAnCUASbLOFC"
      }
    })
    .then(res => console.log(res.data))
    .catch(function (e) {
      console.log(e)
    });
  }

  const fetchCart = () => {
    axios
      .post("http://localhost:4000/api/carts", {
        uid: localStorage.getItem("uid")
      }, {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("accessToken")
        }
      })
      .then(res => console.log(res.data))
      .catch((e) => {
        console.log(e)
      });
  }

  const handleRemoveFromCart = (product) => {
    let i = 0;
    while (i < cartItem.length) {
      if (cartItem[i] === product) {
        cartItem.splice(i, 1);
      } else {
        ++i;
    }
  }
  }
  
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path="/" element={<Login />} />
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
                <Products onAddToCart = {handleAddToCart} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart cartItem = {cartItem} onRemoveFromCart = {handleRemoveFromCart} />
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
          <Route
            path="/addproduct"
            element={
              <PrivateRoute>
                <RegProduct/>
              </PrivateRoute>
            }
          />
          {/* <Route exact path="/home" element={<Products products = {products} onAddToCart = {handleAddToCart} />} /> */}
          {/* <Route exact path="/cart" element = {<Cart cartItem = {cartItem} />} /> */}
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          {/* <Route exact path="/addproduct" element={<RegProduct />} /> */}
          {/* <Route exact path="/demo" element={<Demo />} /> */}
          {/* <Route exact path="/checkout" element={<Checkout/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}
