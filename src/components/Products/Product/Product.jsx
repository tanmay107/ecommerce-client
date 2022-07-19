import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from './styles';
import { addToBasket } from "../../Auth/firebase";

const Product = ({ product, onAddToCart }) => {

  const classes = useStyles();

  const handleAddToCart = (e) => {
    e.preventDefault();
    onAddToCart(product);
  }

  const handleAddToCartFirebase = () => {
    addToBasket( uid, {"product_title": product.title, "product_desc": product.description, "product_price": product.price, "product_image": product.image } )
  }

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image} title={product.title} />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
        </div>
        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant="body2" color="textSecondary" component="p" />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton aria-label="Add to Cart" onClick={(e) => handleAddToCart(e)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
