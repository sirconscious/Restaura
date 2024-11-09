import React from 'react';
import "../style.css";
export default function LoginPage02() {
    const [email, setEmail] = React.useState('');   
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);
    const handleEmailChange = (event) => {
        setEmail(event.target.value);       
        
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleClick = (event) => {
        event.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
        const url = `http://localhost/Riad_Restaurant/Login.php?Email=${encodeURIComponent(email)}&Password=${encodeURIComponent(password)}`;
        fetch(url)
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            if (data) {
              console.log('Data received:', data); // Log the data to the console
              setError(false);

            } else {
              setError(true);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            setError(true);
        });
            }
  return (

    <div className=' flex w-full h-screen items-center justify-center  bg-neutral-500'>
      <div className="form-box">
        <form className="form" method='' action="">
            <span className="title">Log in</span>
            <span className="subtitle">Sign up with your email.</span>
            <div className="form-container">
            {/* <input type="text" className="input" placeholder="Full Name" name='FullName'/> */}
                    <input type="text" className="input" placeholder="Email" name='Email' onChange={handleEmailChange}/>
                    <input type="password" className="input" placeholder="Password" name='Password' onChange={handlePasswordChange}/>

            </div>
            {error && <p className="error-message">Invalid email or password.</p>}
            <button type='button' onClick={handleClick}>Log in</button>
        </form>
        <div className="form-section">
        </div>
      </div>
    </div>
  )
}

