import React, { useState } from 'react'
import { Box } from '@mui/system'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.css'

function Signup() {
    const navigate = useNavigate()
    const[inputs,setInputs] = useState({
        name:"",
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
          const res = await axios.post('http://localhost:3000/signup', {
            name:inputs.name,
            email: inputs.email,
            password: inputs.password,
          });
          const data = await res.data;
          console.log(res.data);
          return data;
        } catch (err) {
          console.log(err);
        }
      };

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(inputs)
        //send HTTP requests
        sentRequest().then(()=>{navigate('/login')})
      }
  return (
    <>
    {/* <Header/> */}
    <div>
        <form onSubmit={handleSubmit}>
            <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
             <Typography variant='h3'>Signup</Typography>  
             <TextField name='name' onChange={handleChange} value={inputs.name} placeholder="Username" margin="normal" style={{ width: '30%' }} />
             <TextField name='email' onChange={handleChange} value={inputs.email} type={'email'} placeholder='Email' margin="normal" style={{ width: '30%' }} />
             <TextField name='password' onChange={handleChange} value={inputs.password} placeholder="Password" type="password" margin="normal" style={{ width: '30%' }} />
             <Button type="submit" variant='contained' style={{ width: '30%', backgroundColor: '#add8e6', color:"white" }}>Signup</Button>
             <p>Have an account ?<Link to='/login'>Login</Link> </p>
            </Box>
        </form>  
    </div>
    </>
  )
}

export default Signup