import React, { useEffect, useState } from 'react'
import {AppBar, Toolbar, Typography ,Box, Tab,Tabs} from '@mui/material'
import { Link, useNavigate,  } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAuth } from '../Actions/AuthActions'

axios.defaults.withCredentials = true


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  // const dispatch = useDispatch()
    const [value,setValue] = useState()
    const [user,setUser] = useState({})


    // const sentLogoutReq = async()=>{
    //   const res = await axios.post("http://localhost:3000/logout",null,{
    //     withCredentials:true
    //   })
    //   if(res.status ===  200){
    //     return res
    //   }
    //   return new Error("Unable to logout,try again!")
    // }



    // const handleLogout = ()=>{
    //   console.log('log');
    //   localStorage.removeItem('user')
    //   dispatch(setAuth())
    //   navigate('/')
    // }
    const handleLogout = () => {
      console.log('logging out');
      const user = localStorage.getItem('user');
      if (user) {
        localStorage.removeItem('user');
      }
      dispatch(setAuth());
      navigate('/');
    };
    
useEffect(()=>{
  const User = JSON.parse(localStorage.getItem('user'))
  console.log(User+"this is my token");
  setUser(User) 
},[])

  return (
    <div>
        <AppBar position='sticky' style={{ backgroundColor: '#7395AE' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          MERN APP
        </Typography>
        <Box value={0}>
        <Tabs onChange={(e,value)=>setValue(value)} value={value} textColor='inherit'>
           {!user && 
           <>
            <Tab to='/login' LinkComponent={Link} label='Login'/>
            <Tab to='/signup' LinkComponent={Link} label='Signup'/> 
            </>}
         {user && <Tab onClick={handleLogout} to='/' LinkComponent={Link} label='Logout'/> }
        </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Header