import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios'

function AdminSignin() {
  const navigate = useNavigate()
  const[inputs,setInputs] = useState({
    email:"",
    password:""
})

  const sentRequest = async () => {
    try {
      const res = await axios.post('http://localhost:3000/admin/login', {
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    sentRequest()
    .then(()=>{navigate('/admin-home')})
  }

  return (
    <div>
        <Navbar/>
    <div className='login-body'>
        <form onSubmit={handleSubmit}>
            <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
             <Typography variant='h3'>Admin Log In</Typography>  
             <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin="normal" style={{ width: '30%' }} />
             <TextField name='password' onChange={handleChange} value={inputs.password} placeholder="Password" type="password" margin="normal" style={{ width: '30%' }} />
             <Button type="submit" variant='contained' style={{ width: '30%', backgroundColor: '#add8e6', color:"white" }}>Login</Button>
             <p>Register here ?<Link to='/signup'>Sign Up</Link> </p>
            </Box>
        </form>  
    </div>
    </div>
  )
}

export default AdminSignin