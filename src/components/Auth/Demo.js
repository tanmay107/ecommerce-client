import axios from 'axios'
import React, { useEffect } from 'react'
import { auth } from '../Auth/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useNavigate } from 'react-router-dom';
// import { auth, db, logout } from "./firebase";
// import useAuth from '../../hook/useAuth'

export default function Demo() {
  const [user, loading, error] = useAuthState(auth);
  //cart functionality - 
  //fetching ---------
  // axios
  //   .post("http://localhost:4000/api/carts", {
  //     uid : user.uid
  //   }, {
  //     headers : {
  //       Authorization : 'Bearer ' + localStorage.getItem("accessToken"),
  //     }
  //   })
  //   .then(res => console.log(res.data))
  //   .catch((e) => {
  //     console.log(e)
  //   });

  //creation ---------------
  axios
    .post("http://localhost:4000/api/carts/create", 
      {
        uid: localStorage.getItem("uid"),
        cart: [
            {
                prodct_id : "test234",
                qty : "3"
            },
            { 
                product_id : "test333",
                qty : "5"
            }
        ]
    }
    , {
      headers : {
        Authorization : 'Bearer ' + localStorage.getItem("accessToken"),
      }
    })
    .then(res => console.log(res.data))
    .catch(function (e) {
      console.log(e)
    });
    

  return (
    <div>Demo</div>
  )
}
