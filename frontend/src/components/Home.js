import React, { useEffect,useState,useRef } from 'react'
import axios from 'axios'
import Header  from './Header'
import { Box } from '@mui/system'
import {MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow} from 'mdb-react-ui-kit'
import './Home.css'
axios.defaults.withCredentials = true



function Home() {
  const placeholderImage ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBH5hnE518TNaRZ-GzMfUFxuhMfowd9k9u4Fyg2c-6qXc_WjRzQ7yh1sprT8ivwyw0uWc&usqp=CAU"
  const fileRef = useRef()
  const [user,setUser] = useState()
  const [src,setSrc] = useState({})

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
      console.log(res.data);
      const data = await res.data
      console.log(data);
      localStorage.setItem('authorization.user', JSON.stringify(res.data))
      return data;
  }

  const handleDp = async(e)=>{
    e.preventDefault()
    const file = fileRef.current.files[0]
    let formData = new FormData();
    formData.append("image",file, file?.name)
    await axios.patch('http://localhost:3000/update',
        formData,
        {headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'multipart/form-data'
        }}
        
    )
    .then(res => {
        if (res.data.success) {
            console.log("profile updated");
            window.location.reload();
        }
  })
  }
  
  const getUserDp = async()=>{
    setSrc(user.image)     
  }

console.log(src+'= mysrc')

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem(user));
  console.log(storedUser)
  if (storedUser) {
    setUser(storedUser);
  } else {
    sentRequest().then((data) => {
      if (data && data.user) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        console.error('Error retrieving user data:', data);
      }
    }).catch((err) => {
      console.error('Error retrieving user data:', err);
    });
  }
},[]);

 

  useEffect(() => {
    getUserDp();
  }, [user]);

  return (
    <>
    <Header/>
    <div>
      {user &&  <Box marginLeft="auto" marginRight="auto" display="flex" flexDirection="column" gap="1rem" justifyContent="center" alignItems="center" marginTop="10%">
      <div className="total">
      {/* {user && <h1>Hi,{user?.name}</h1>} */}
    <MDBContainer>
        <MDBRow className="justify-content-center  main-card">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard className='card_profile' style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                   <div className="d-flex text-black" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
  <div className="flex-shrink-0"> 
    <MDBCardImage
      src={src ? src : placeholderImage}
      alt="Userimage"
      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
      fluid
    />
  </div>
  <div className="d-flex flex-column ml-3 form-2" style={{ alignItems: 'flex-end' }}>
    <MDBCardTitle>USER : {user?.name}</MDBCardTitle>
    <MDBCardText>EMAIL : {user?.email}</MDBCardText>
    <form onSubmit={handleDp} encType='multipart/form-data'>
      <input ref={fileRef}  className='img_button ' type="file" accept='image/*' /><br></br>
      <button className='btn btn-outline-secondary btn-sm mt-2 ' type='submit'>Add profile photo</button>
    </form>
  </div>
</div> 
         </MDBCardBody>
         </MDBCard>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
      </div>
      </Box>
      }
    </div>
    </>
  )
}

export default Home
