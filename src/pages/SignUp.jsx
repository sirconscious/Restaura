import React, { useState } from 'react';
import axios from 'axios';
import { Link ,  useNavigate  } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setMessage("Passwords do not match");
        return;
    }

    const url = "http://localhost/riadapis/index.php?action=signUp";
    let fdata = new FormData();
    fdata.append('username', username);
    fdata.append('email', email);
    fdata.append('password', password);
    fdata.append('firstName', firstName);
    fdata.append('lastName', lastName);

    fetch(url, {
        method: 'POST',
        body: fdata,
    })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
        console.log(data);
        if (data.status === "success") {
            setMessage("Success: " + data.message);
            navigate("/login");
            // Redirect if needed
        } else {
            setMessage("Error: " + data.message);
        }
    })
    .catch((error) => {
        console.log(error); // This will provide more specific error information
        setMessage("Error: Unable to complete sign-up.");
    });
};
return (
  <div className="h-screen flex items-center justify-center bg-[url('/src/assets/Riadsss.png')] bg-cover bg-center">
    <div className="flex flex-col justify-center text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-4xl w-full mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-gray-600 font-medium">
              Username:
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
            <label className="block text-gray-600 font-medium">
              First Name:
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
            />
            <label className="block text-gray-600 font-medium">
              Password:
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="space-y-4">
            <label className="block text-gray-600 font-medium">Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
            <label className="block text-gray-600 font-medium">
              Last Name:
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
            />
            <label className="block text-gray-600 font-medium">
              Confirm Password:
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-6 shadow-md transition duration-200"
        >
          Sign Up
        </button>
      </form>
      {message && <div className="text-red-500 text-sm mt-4">{message}</div>}

      <div className="mt-4 text-center">
        <Link
          to="/login"
          className="text-blue-500 hover:text-blue-700 transition"
        >
          Already have an account? Log in
        </Link>
      </div>
    </div>
  </div>
);
}

export default SignUp;
