import React, { useState } from 'react'
import {AppBar, Toolbar, Typography ,Box, Tab,Tabs} from '@mui/material'
import { Link, useNavigate,  } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from '../store'
axios.defaults.withCredentials = true

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const isLoggedIn = useSelector(state => state.isLoggedIn)
    const [value,setValue] = useState()


    // const sentLogoutReq = async()=>{
    //   const res = await axios.post("http://localhost:3000/logout",null,{
    //     withCredentials:true
    //   })
    //   if(res.status ===  200){
    //     return res
    //   }
    //   return new Error("Unable to logout,try again!")
    // }

    const sentLogoutReq = async() => {
      try {
        const res = await axios.post("http://localhost:3000/logout", null, {
          withCredentials: true
        });
        if (res.status === 200) {
          // clear cookie on the frontend
          document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
          // clear localStorage
          localStorage.clear();
    
          // redirect to the login page or homepage
          // replace the URL with the URL of your login or homepage
          window.location.href = 'http://localhost:3002/login';
        }
      } catch (err) {
        console.error(err);
      }
    }


    const handleLogout = ()=>{
      sentLogoutReq()
      .then(()=>{navigate('/user')})
      .then(()=>{
        dispatch(authActions.logout())
      })
    }
  return (
    <div>
        <AppBar position='sticky' style={{ backgroundColor: '#7395AE' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MERN APP
        </Typography>
        <Box value={0}>
        <Tabs onChange={(e,value)=>setValue(value)} value={value} textColor='inherit'>
           { !isLoggedIn && 
           <>
            <Tab to='/login' LinkComponent={Link} label='Login'/>
            <Tab to='/signup' LinkComponent={Link} label='Signup'/> 
            </>}
         {isLoggedIn &&   <Tab onClick={handleLogout} to='/' LinkComponent={Link} label='Logout'/> }
        </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Header