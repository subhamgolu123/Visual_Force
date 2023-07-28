import React, { useEffect, useState } from 'react';
import './style/Home.css';

function Home() {
  const [userName, setUsername] = useState();
  const [password, setPassword] = useState();
  useEffect(()=>{
    console.log(userName)
  }, [userName])
  useEffect(()=>{
    console.log(password)
  },[password])
  return (
    <div className='login-form'>
      <div className="container">
        <div className="image">
            <p className='logo-header'>#header-logo</p>
        </div>
        <div className="content">
            <h5>Login</h5>
            <div className="form-group">
                <label htmlFor="username">UserName</label>
                {/* <br /> */}
                <input type="text" className="form-control" name="" id="username" aria-describedby="helpId" placeholder="UserName" onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <br />
                <input type="password" className="form-control" name="" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <a className="fp" href="index.html">Forgot Password?</a>
            <br />
            <button  className="btn blue ligten-4">Login</button>
        </div>
    </div>
  </div>
  );
}

export default Home;
