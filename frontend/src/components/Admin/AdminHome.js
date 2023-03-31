import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

 import Table from '@mui/material/Table';
 import TableBody from '@mui/material/TableBody';
 import TableCell from '@mui/material/TableCell';
 import TableContainer from '@mui/material/TableContainer';
 import TableHead from '@mui/material/TableHead';
 import TableRow from '@mui/material/TableRow';
 import Paper from '@mui/material/Paper';
 import { Container } from '@mui/system';
import {   useNavigate } from 'react-router-dom';
import './AdminHome.css'


function AdminHome() {
    const [users,setUsers]= useState([])

    const navigate = useNavigate()
    const placeholderImage ="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
    let count = 1  

    function getUsers() {
           console.log("get user details");
           axios.get("http://localhost:3000/admin/user",{
                  headers: { 'x-access-token':localStorage.getItem('token'),
                   'Content-Type': 'multipart/form-data'}})
                   .then(res => {
                     if (res.status === 200) {
                         console.log(res.data.users);
                         setUsers(res.data.users) 
                         localStorage.setItem('user', JSON.stringify(res.data.users));
                     } else {
                         console.log('no users found');
                     }
        
                 })
             }

    

    const deleteUser = async(id)=>{
        console.log("delete user")
        const data = {id}
        console.log(data);
        await axios.patch("http://localhost:3000/admin/delete",data)
        .then(res=>{
            if (res.status === 200) {
            console.log("user deleted");
            window.location.reload();
            } else {
            console.log('user not deleted');
            }
            
     })
            
    }

    useEffect(() => {
        getUsers()
    }, [])

  return (
    <>
    <div>
          <Navbar/>
          <div>
            
            <div>
                <br></br>
            </div>
          
             <Container>
             <TableContainer  component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead className='tableHead'>
           <TableRow>
             <TableCell className='head '>Sl.No</TableCell>
             <TableCell  className='head'>IMAGE</TableCell>
             <TableCell  className='head'>Name</TableCell>
             <TableCell  className='head'>Email</TableCell>
             <TableCell className='head'>Actions</TableCell>
           </TableRow>
         </TableHead>
      <TableBody>
       
          {users.map((user) => (
           
             <TableRow className='tableRow'
               key={user.email}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                {count++}
               </TableCell>
               <TableCell > <img style={{ width: '80px', height:'80px', borderRadius: '10%' }}
                 src={ user.image ?"http://localhost:3000"+user.image.slice(21): placeholderImage} alt='userDp'/></TableCell>
               <TableCell >{user.name} </TableCell>
               <TableCell >{user.email}</TableCell>
               <TableCell><p className='btn btn-outline-secondary edit' onClick={()=>navigate(`/admin/edit/${user._id}`)}>Edit</p> &nbsp; &nbsp;
                <p className='btn btn-outline-danger ml-3 delete' onClick={()=>deleteUser(user._id)}>Delete</p></TableCell>
             </TableRow>
             ))}
         </TableBody>
          
       </Table>
     </TableContainer>
       </Container>
         </div>
          
    </div>
    </>
  )
}

export default AdminHome

