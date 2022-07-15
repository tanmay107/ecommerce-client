import React, { useEffect }  from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from "../Auth/firebase";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function Checkout() {

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  let amount = location.state.amt;

  useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      console.log(user);
    }, [user, loading]);

  return (
    <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '50vh' }} 
    ><Grid item xs={3}>
        <Card sx={{ minWidth: 350 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Your Total Amount is,
            </Typography>
            <Typography variant="h5" component="div">
              ${amount}
            </Typography>
            <Typography variant="body2">
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Proceed For Payment</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}
