import { Container, Typography, Box, Button, Paper, styled } from "@material-ui/core";
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, logout } from "../Auth/firebase";
import Grid from "@material-ui/core/Grid"
import React, { useEffect } from 'react'
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

export default function ({ cartItem }) {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const classes = useStyles();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        console.log(user);
      }, [user, loading]);

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
            navigate('/checkout',{state:{amt: total.toFixed(2)}});
        };
        console.log(total);
        return (
            <Container>
                <Typography className={classes.title} variant="h3" gutterBottom>Your Shopping Cart</Typography>
                {/* <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={4} alignItems="center" justifyContent="center" style={{ minHeight: '50vh' }} >
                    {
                        uniqCart.map((item) => (
                            <Grid key={item.id} xs={12} sm={6} md={4} lg={3}>
                                <CartItem item={item} freq={freq} />
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} md={12} >
                        <Item>Total :- {total.toFixed(2)}</Item>
                        <Button onClick={handleCheckout}>Checkout</Button>
                    </Grid>
                </Grid>
                </Box> */}
                    <Grid container spacing={3}>
                        {uniqCart.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem item={item} freq={freq} />
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
