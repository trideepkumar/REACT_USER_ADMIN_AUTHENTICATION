
import React from 'react';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'
import { useSelector } from 'react-redux';




function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
   <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
         { isLoggedIn &&  <Route path='/user' element={<Home/>}/>}{" "}
      </Routes>
    </main>
   </React.Fragment>
  );
}

export default App;
