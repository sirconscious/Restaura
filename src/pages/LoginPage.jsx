import React from 'react';
import "../style.css";
export default function LoginPage() {
  return (
    <div className=' flex w-full h-screen items-center justify-center  bg-neutral-500'>
      <div className="form-box">
        <form className="form" method='post' action="http://localhost/Riad_Restaurant/SignUp.php">
            <span className="title">Sign up</span>
            <span className="subtitle">Create a free account with your email.</span>
            <div className="form-container">
            <input type="text" className="input" placeholder="Full Name" name='FullName'/>
                    <input type="text" className="input" placeholder="Email" name='Email'/>
                    <input type="password" className="input" placeholder="Password" name='Password'/>

            </div>
            <button type='submit'>Sign up</button>
        </form>
        <div className="form-section">
        <p>Have an account? <a href="">Log in</a> </p>
        </div>
      </div>
    </div>
  )
}

