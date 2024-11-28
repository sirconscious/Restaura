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
  const [message, setMessage] = useState(''); // To display the server response message
  const navigate = useNavigate();
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setMessage("Passwords do not match");
  //     return;
  //   }

  //   const url = "http://localhost/riadapis/index.php?action=signUp";
  //   let fdata = new FormData();
  //   fdata.append('username', username);
  //   fdata.append('email', email);
  //   fdata.append('password', password);
  //   fdata.append('firstName', firstName);
  //   fdata.append('lastName', lastName);

  //   axios.post(url, fdata)
  //   .then((response) => {
  //     console.log(response)
  //     if (response.data && response.data.status === "success") {
  //       setMessage("Success: " + response.data.message);
  //       // Redirect if needed
  //     } else {
  //       setMessage("Error: " + response.data.message);
  //     }
  //   })
  //   // .catch((error) => setMessage("Error: Unable to complete sign-up."));
  
  // };
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
      <div className="flex flex-col justify-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-slate-700">Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Enter your username"
              required
            />
            <label className="block text-slate-700">First Name:</label>
            <input 
              type="text" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Enter your first name"
              required
            />
            <label className="block text-slate-700">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="space-y-4">
            <label className="block text-slate-700">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Enter your email"
              required
            />
            <label className="block text-slate-700">Last Name:</label>
            <input 
              type="text" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Enter your last name"
              required
            />
            <label className="block text-slate-700">Confirm Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              className="w-full px-4 py-3 border-2 rounded-md"
              placeholder="Confirm your password"
              required
            />
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md mt-6">Sign Up</button>
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
