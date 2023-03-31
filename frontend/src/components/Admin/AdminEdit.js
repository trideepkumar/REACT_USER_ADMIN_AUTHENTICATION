import { Avatar, Box, CssBaseline, Grid, TextField } from '@mui/material';
import { createTheme } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Container, Navbar, ThemeProvider } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminEdit.css'





function AdminEdit() {

   const navigate = useNavigate();
   const imageRef = useRef()
   const fileRef = useRef()
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [image, setImage] = useState(null);
   const [error, setError] = useState('');
   const theme = createTheme();
   let { id } = useParams();
   let userData;

   const submitHandler =async (e) => {
        e.preventDefault()
        const user = {name,email}
   }
    const editUser = async (e) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        await axios.put(`http://localhost:3000/admin/edit-user/${id}`,{name,email})
        .then(res => {
            console.log(res)
            if(res.status===200){
                console.log("user updated");
              navigate('/admin-home')
            }else{
              setError(res.data.error)
            }
            
     })
    }

        useEffect(() => {
            axios
               .get(`http://localhost:3000/admin/edit/${id}`) 
               .then((res) => {
                 console.log(res)
                 if(res.status===200) {
                  userData = res.data.user
                  console.log(userData);
                  setName(userData.name)
                  setEmail(userData.email)
                  setImage(userData.image)
                 } else {
                   navigate('/admin-home')
                 }
               })
               .catch((error) => {
                 console.log(error);
               });
           }, [id,navigate]);
         

  return (
    <>  

     <div> <Navbar/></div>
     <div>
    
     <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginTop: '7rem' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}style={{ width: '80px', height:'80px', borderRadius: '10%' }} src={image ?"http://localhost:9000"+image.slice(21):""}>
          </Avatar>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={submitHandler}
          >
            <p className="error" style={{ marginBottom: '1rem' }}>
              {error}
            </p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="given-name" name="name" required fullWidth  label="Name" autoFocus value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth  label="Email Id" name="email" autoComplete="email" value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Button className='but'  type="submit"  variant="contained" onClick={editUser}>Submit</Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
     </div>

    </>

  )
}



export default AdminEdit