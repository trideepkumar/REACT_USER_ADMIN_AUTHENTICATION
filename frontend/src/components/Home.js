
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
axios.defaults.withCredentials = true



let firstRender = true;

function Home() {
  const [user,setUser] = useState()
  const refreshToken = async()=>{
    const res = await axios.get("http://localhost:3000/refresh",{
      withCredentials:true
    }).catch((err)=>{console.log(err);})
    const data = await res.data
    return data;
  }
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
      firstRender=false
      sentRequest().then((data)=>{
      setUser(data.user)
     })}
       let interval = setInterval(()=>{
        refreshToken().then(data=>{setUser(data)})
       },1000*28)

       return ()=>{clearInterval(interval)}
  },[])
  return (
    <div>
      <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
      {user && <h1 style={{color:'red'}}>Hii, {user.name}</h1>}
      </Box>
    </div>
  )
}

export default Home