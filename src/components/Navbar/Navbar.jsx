import { AppBar, Avatar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, logout } from "../Auth/firebase";

export default function Navbar() {

    const [user, loading, error] = useAuthState(auth);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        console.log(user.accessToken)
        localStorage.setItem("accessToken", user.accessToken)
      }, [user, loading]);

  return (
      <Box sx={{ flexGrow: 1, marginBottom: "1em" }} >
          <AppBar position="static" >
              <Toolbar>
                  <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      sx={{ mr: 2 }}
                      component = {Link}
                      to = "/"
                  >
                      <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/126/126083.png" />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  </Typography>
                    {user && <Button color="inherit" component={Link} to="/cart">Cart</Button>}
                    {user && <Button color="inherit" component={Link} to="/addproduct">Add Product</Button>}
                    { user ? <Button color="inherit" onClick={logout}>Logout</Button> : <Button color="inherit" component={Link} to="/">Login</Button> }
              </Toolbar>
          </AppBar>
      </Box>
  )
}
