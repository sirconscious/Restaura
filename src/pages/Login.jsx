import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import riadImage from '../assets/Riadsss.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState(''); // To display the server response message
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/TestLogin/login.php";
    let fdata = new FormData();
    fdata.append('username', username);
    fdata.append('password', password);
    fdata.append('remember', remember);

    axios.post(url, fdata)
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data && response.data.status === "success") {
          setMessage("Success: " + response.data.message);
          // Redirect to another page after successful login
          navigate("/Reservations"); // Example of navigating to a dashboard page after login
        } else {
          setMessage("Error: " + response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error in request:", error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: `url(${riadImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex flex-col justify-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-700">Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-slate-700">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center text-white">
            <input 
              type="checkbox" 
              checked={remember} 
              onChange={(e) => setRemember(e.target.checked)} 
              className="mr-2"
            />
            <label className="text-slate-700">Remember me</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        {message && <div className="text-red-500 text-sm mt-2">{message}</div>}

        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;