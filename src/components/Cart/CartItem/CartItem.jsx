import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';

export default function CartItem({ item, freq, onRemoveFromCart }) {

  const classes = useStyles();

  const handleRemove = (e) => {
    e.preventDefault()
    onRemoveFromCart(item)
  }

  return (
      <Card className="cart-item">
        <CardMedia image={item.image} alt={item.title} className={classes.media} />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="h6">{item.price}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Typography>&nbsp;Quantity:- {freq[item.id]}&nbsp;</Typography>
            <Button onClick={(e) => handleRemove(e)}>Remove</Button>
          </div>
        </CardActions>
      </Card>
  )
}
