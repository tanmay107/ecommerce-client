import { Container, Typography, Box, Button, Paper, styled } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import Grid from "@material-ui/core/Grid"
import React, { useEffect } from 'react'
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

export default function ({ cartItem, onRemoveFromCart }) {

    const navigate = useNavigate();
    const classes = useStyles();
    
    const getFrequency = (arr) => {
        const map = {};
        arr.forEach(item => {
           if(map[item.id]){
              map[item.id]++;
           }else{
              map[item.id] = 1;
           }
        });
        return map;
     };

     const getTotal = (arr) => {
        let count = 0
        arr.map((item) => { return count += item.price })
        return count
     }

    console.log("The items in your cart are :- ", cartItem)
    if (cartItem.length === 0) {
        return <div>No items in your cart !</div>
    }
    else {
        const freq = getFrequency(cartItem);
        const uniqCart = [ ...new Set(cartItem)];
        let total = getTotal(cartItem);
        const handleCheckout = () => {
            navigate('/checkout',{state:{amt: total.toFixed(2), cart: cartItem}});
        };
        console.log(total);
        return (
            <Container>
                <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
                    <Grid container spacing={3}>
                        {uniqCart.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} freq={freq} onRemoveFromCart={onRemoveFromCart} />
                        </Grid>
                        ))}
                    </Grid>
                    <div className={classes.cardDetails}>
                        <Typography variant="h4">Subtotal: {total.toFixed(2)}</Typography>
                        <div>
                        <Button className={classes.checkoutButton} onClick={handleCheckout} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                    </div>
                </div>
            </Container>
          )
    }
}
