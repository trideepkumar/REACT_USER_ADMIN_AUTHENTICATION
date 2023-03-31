import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useDispatch } from 'react-redux'
import { setAuth } from '../Actions/AuthActions'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
          await axios.post('http://localhost:3000/login', {
            email: inputs.email,
            password: inputs.password,
          })
          .then(res=>{
            console.log(res.status);
            if(res.status===200){
              console.log(res.data.token)
              localStorage.setItem('user', JSON.stringify(res.data.token))
              dispatch(setAuth())
              navigate('/user')
            }
          })
        } catch (err) {
          console.log(err);
        }
      }

    const handleSubmit = (e)=>{
        e.preventDefault()
        sentRequest()
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
             <Button  type="submit" variant='contained' style={{ width: '30%', backgroundColor: '#add8e6', color:"white" }}>Login</Button>
             <p>Register here ?<Link to='/signup'>Sign Up</Link> </p>
            </Box>
        </form>  
    </div>
    </>
  )
}

 

export default Login