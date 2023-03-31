import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../store'
import './Login.css'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const[inputs,setInputs] = useState({
        email:"",
        password:""
    })
    const handleChange = (e) => {
        setInputs((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }))
      }
    
      const sentRequest = async () => {
        try {
          const res = await axios.post('http://localhost:3000/login', {
            email: inputs.email,
            password: inputs.password,
          });
          const data = await res.data;
          console.log(data);
          return data;
        } catch (err) {
          console.log(err);
        }
      };

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(inputs)
        //send HTTP requests
        sentRequest()
        .then(()=>dispatch(authActions.login()))
        .then(()=>{navigate('/user')})
      }
  return (
    <>
    {/* <Header/> */}
    <div className='login-body'>
        <form onSubmit={handleSubmit}>
            <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
             <Typography variant='h3'>Log In</Typography>  
             <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin="normal" style={{ width: '30%' }} />
             <TextField name='password' onChange={handleChange} value={inputs.password} placeholder="Password" type="password" margin="normal" style={{ width: '30%' }} />
             <Button type="submit" variant='contained' style={{ width: '30%', backgroundColor: '#add8e6', color:"white" }}>Login</Button>
             <p>Register here ?<Link to='/signup'>Sign Up</Link> </p>

            </Box>
        </form>  
    </div>
    </>
  )
}

 

export default Login