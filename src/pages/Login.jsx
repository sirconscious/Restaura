import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import riadImage from "../assets/Riadsss.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "http://localhost/riadapis/index.php?action=login";
    let fdata = new FormData();
    fdata.append("username", username);
    fdata.append("password", password);
    fdata.append("remember", remember);

    axios
      .post(url, fdata)
      .then((response) => {
        if (response.data && response.data.status === "success") {
          setMessage("Success: " + response.data.message);
          if (username === "admin") {
            navigate("/Dashboard");
          } else {
            navigate("/Reservations");
          }
          localStorage.setItem(
            "userInfo",
            JSON.stringify({ username, password, remember }),
          );
        } else {
          setMessage("Error: " + response.data.message);
        }
      })
      .catch(() => {
        setMessage("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.remember) {
      setUsername(userInfo.username);
      setPassword(userInfo.password);
      setRemember(userInfo.remember);
    }
  }, []);

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${riadImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 font-medium">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center text-gray-600">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label>Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        {message && <div className="text-red-500 text-sm mt-4">{message}</div>}

        <div className="mt-4 text-center">
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 transition"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
