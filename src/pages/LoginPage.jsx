import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/testLogin/SignUp.php";
    let fdata = new FormData();
    fdata.append("username", username);
    fdata.append("email", email);
    fdata.append("password", password);
    fdata.append("firstName", firstName);
    fdata.append("lastName", lastName);

    // axios.post(url, fdata)
    //   .then((response) => {
    //     setMessage(response.data.message || "An error occurred");
    //   })
    //   .catch(() => setMessage("An error occurred. Please try again."));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center">
      <div className="flex flex-col justify-center text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-4xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-slate-700 mb-6">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700">Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
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
                name="firstName"
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
                name="password"
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
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
                name="email"
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
                name="lastName"
                className="w-full px-4 py-3 border-2 border-neutral-950 rounded-md bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
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
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
