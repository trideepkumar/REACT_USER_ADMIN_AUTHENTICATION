
import React from 'react';
import './App.css';
import {Routes,Route} from  'react-router-dom'
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup'
import Home from './components/Home'

function App() {
  return (
   <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
           <Route path='/login' element={<Login/>}/>
           <Route path='/signup' element={<Signup/>}/>
           <Route path='/user' element={<Home/>}/>
      </Routes>
    </main>
   </React.Fragment>
  );
}

export default App;