import React, { useState } from 'react'
import { registerProduct } from '../Auth/firebase'
import './RegProduct.css'

export default function RegProduct() {

    const [id, setId] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();

    const handleClick = (e) => {
        e.preventDefault();
        registerProduct(id, title, description, price)
    }

  return (
    <div className="add_prod">
        <div className="add_prod__container">
          <input
            type="number"
            className="add_prod__textBox"
            onChange={(e) => setId(e.target.value)}
            placeholder="Id"
          />
          <input
            type="text"
            className="add_prod__textBox"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            type="text"
            className="add_prod__textBox"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="number"
            className="add_prod__textBox"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
          <button
            className="add_prod__btn"
            onClick={(e) => handleClick(e)}
          >
            Add Product
          </button>
        </div>
      </div>
  )
}
