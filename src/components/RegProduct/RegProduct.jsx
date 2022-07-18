import React, { useState } from 'react'
import { registerProduct } from '../Auth/firebase'
import './RegProduct.css'

export default function RegProduct() {

    const [image, setImage] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [price, setPrice] = useState();

    const handleClick = (e) => {
        e.preventDefault();
        registerProduct(title, description, price, image)
    }

  return (
    <div className="add_prod">
        <div className="add_prod__container">
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
          <input
            type="text"
            className="add_prod__textBox"
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image"
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
