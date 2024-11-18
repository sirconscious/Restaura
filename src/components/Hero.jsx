
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {  Link } from 'react-router-dom';

import vid1 from "../assets/vid1.mp4";
import logo2 from "../assets/finalLogo-removebg-preview.png";
import logoV from "../assets/white_logo-removebg-preview.png";
import { motion } from "framer-motion";
import { FaMapPin } from "react-icons/fa";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiSnow,
  WiFog,
  WiThermometer,
} from "react-icons/wi";

export default function Hero() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          temperature: Math.floor(data.main.temp),
          weatherType: data.weather[0].main,
        });
      } else {
        setError(`Error: ${data.message}`);
      }
    } catch (err) {
      setError("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    search("Marrakech");
  }, []);

  // Function to get the appropriate weather icon
  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <WiDaySunny size={24} />;
      case "Clouds":
        return <WiCloud size={24} />;
      case "Rain":
        return <WiRain size={24} />;
      case "Snow":
        return <WiSnow size={24} />;
      case "Fog":
      case "Mist":
      case "Haze":
        return <WiFog size={24} />;
      default:
        return <WiThermometer size={24} />;
    }
  };
  const today = new Date();

  const currentDate = today.toISOString().split("T")[0];
  const currentYear = today.getFullYear();

  return (
    <div>
      <section className="relative flex h-screen items-center justify-center">
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
          <video
            src={vid1}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          ></video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>
        {/* Log in Sign up */}
        
        {/* Logo and location */}
        <div className="relative z-20 flex h-screen flex-col justify-end items-center pb-5">
        <div className="absolute bottom-20 -left-40  right-full z-10 hidden lg:block">
          <Link to="/SignUp">
          <button
            type="button"
            className="text-white  border  hover:bg-white hover:text-neutral-900 
         focus:outline-none  font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 border-white hover:border-neutral-900 hover:dark:bg-neutral-300 flex justify-center items-center "
          >
            {" "}
            <span className="mr-3">Reservation</span> <FaArrowRight />{" "}
          </button></Link>
        </div>
          <motion.img
            initial={{ opacity: 0, y: 400, rotateY: "180deg" }}
            animate={{ opacity: 1, y: 0, rotateY: "0deg" }}
            transition={{ duration: 0.8, delay: 0.8, ease: "linear" }}
            src={logoV}
            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
            alt=""
          />
          <div className="flex flex-col items-center ">
            <motion.img
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5, ease: "linear" }}
              src={logo2}
              alt=""
              className="w-1/3 lg:w-1/5 sm:w-1/5 mt-2"
            />

            <p className="p-2  text-lg tracking-tighter text-white flex flex-row">
              <FaMapPin className="mr-2" /> Marrakech
            </p>
          </div>
          <Link to="/SignUp">
          <button
            type="button"
            className="text-white  border  hover:bg-white hover:text-neutral-900 
         focus:outline-none  font-medium rounded-lg text-xl px-5 py-2.5 text-center me-2 mb-2 border-white hover:border-neutral-900 hover:dark:bg-neutral-300 flex lg:hidden justify-center items-center "
          >
            {" "}
            <span className="mr-3">Reservation</span> <FaArrowRight />{" "}
          </button></Link>
        </div>

        {/* Weather data on the bottom right */}
        <div className="absolute bottom-32 right-5 p-6 bg-black bg-opacity-30 rounded-lg shadow-xl text-white lg:flex items-center space-x-4 hidden sm:block">
          {error ? (
            <p className="text-red-500 font-semibold">{error}</p>
          ) : weatherData ? (
            <>
              <div className="flex flex-col items-center">
                <p className="text-3xl">Marrakech </p>
                {currentDate}
                <div className="flex items-center space-x-2">
                  {getWeatherIcon(weatherData.weatherType)}
                  <p className="text-xl font-semibold">
                    {weatherData.temperature}°C
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </section>
    </div>
  );
}
