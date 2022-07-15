import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { auth, db, logout } from "../../../Auth/firebase";

export default function ProductDetails() {
  
    const [product, setProduct] = useState({})
    let { id } = useParams();

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res=>res.json())
        .then(json=>setProduct(json))
    }, [])

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        console.log(user);
      }, [user, loading]);
    
  return (
    <div>
      <img src={product.image} />
      <br/>
      {product.title}
      <br />
      {product.description}
      <br />
      {product.category}
      <br/>
      {product.price}
    </div>
  )
}
