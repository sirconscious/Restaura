import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import riadImage from '../assets/Riadsss.png';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState(''); // To display the server response message
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/testLogin/SignUp.php";
    let fdata = new FormData();
    fdata.append('username', username);
    fdata.append('email', email);
    fdata.append('password', password);
    fdata.append('confirmPassword', confirmPassword);
    fdata.append('firstName', firstName);
    fdata.append('lastName', lastName);
    fdata.append('location', location);

    axios.post(url, fdata)
      .then((response) => {
        console.log("Response data:", response.data);
        if (response.data && response.data.status === "success") {
          setMessage("Success: " + response.data.message);
          navigate("/Reservations");
        } else {
          setMessage("Error: " + response.data.message);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error in request:", error.response);
          setMessage("An error occurred. Please try again.");
        } else {
          console.error("Unknown error:", error);
        }
      });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/src/assets/Riadsss.png')] bg-cover bg-center">
      <div className="flex flex-col justify-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
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
              <label className="block text-slate-700">First Name:</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
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
            <div>
              <label className="block text-slate-700">Location:</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your location"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-slate-700">Last Name:</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label className="block text-slate-700">Confirm Password:</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
