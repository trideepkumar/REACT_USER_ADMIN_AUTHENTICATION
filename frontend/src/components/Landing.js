import React from 'react';
import './Landing.css'
import Header from './Header'

const LandingPage = () => {
  return (<>   
   <Header/>
    <div className="landing-page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>WELCOME TO MERN APPLICATION</h1>
            <p className='p-tag'>user-admin-authentication react app</p>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default LandingPage;