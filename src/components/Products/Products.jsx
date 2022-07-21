import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Product from "./Product/Product";
import useStyles from './styles';
import axios from "axios";

const Products = ({ onAddToCart }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/products/", {
        headers : {
          Authorization: 'Bearer ' + localStorage.getItem("accessToken"),
        },
      })
      .then(res => setProducts(res.data))
  }, [])

  const classes = useStyles();
  return (
    <main className={classes.content} >
      <div className={classes.toolbar} />
        <Grid container justify="center" spacing={4}>
          {products.map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <Product product={product} onAddToCart={onAddToCart} />
              </Grid>
            ))}
        </Grid>
    </main>
  );
};

export default Products;
