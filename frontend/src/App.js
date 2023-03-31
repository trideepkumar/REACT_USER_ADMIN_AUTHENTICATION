import React from 'react';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'
import Landing from './components/Landing';
import AdminSignin from './components/Admin/AdminSignin';
// import {Provider , useSelector} from 'react-redux'
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
import AdminHome from './components/Admin/AdminHome';
import AdminEdit from './components/Admin/AdminEdit'


function App() {
  return (
   <React.Fragment>
    <main>
      <Routes>
     
        <Route element={<PublicRoute/>}>
          <Route path='/' element={<Landing/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup'element={<Signup/>}/>
        </Route>  

        <Route element={<ProtectedRoute/>}>
           <Route path='/user'  element={<Home/>}/>
        </Route>

          <Route path='/admin'  element={<AdminSignin/>}/>
          <Route path='/admin-home' element={<AdminHome/>}/>
          <Route path='/admin/edit/:id' element={<AdminEdit/>}/>

      </Routes>
    </main>
   </React.Fragment>
  );
}

export default App;
