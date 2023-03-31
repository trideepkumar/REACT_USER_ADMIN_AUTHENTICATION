
import React from 'react';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'
import { useSelector } from 'react-redux';
import Landing from './components/Landing';
import AdminSignin from './components/Admin/AdminSignin';




function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
   <React.Fragment>
    <main>
      <Routes>
           <Route path='/'  element={<Landing/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/user' element={<Home/>}/>
          <Route path='/admin' element={<AdminSignin/>}/>
      </Routes>
    </main>
   </React.Fragment>
  );
}

export default App;
