
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
axios.defaults.withCredentials = true



let firstRender = true;

function Home() {
  const [user,setUser] = useState()
  const [name,setName] = useState('')
  // const refreshToken = async()=>{
  //   const res = await axios.get("http://localhost:3000/refresh",{
  //     withCredentials:true
  //   }).catch((err)=>{console.log(err)})
  //   const data = await res.data
  //   return data;
  // }
  const sentRequest = async()=>{
      console.log('sent in home works');
      const res = await axios.get('http://localhost:3000/user',{
        withCredentials:true
      }).catch(err=>{
        console.log(err);
      })
      console.log('1');
      console.log(res.data);
      const data = await res.data
      console.log(data);
      return data
     
  }
  useEffect(()=>{
    if(firstRender){
      sentRequest().then((data)=>{
      setUser(data.user)
      setName(data.user.name)
     })}
  },[])
  return (
    <div>
      <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
        {name}
      {user && <h1>{user?.name}</h1>}

      </Box>
    </div>
  )
}

export default Home
