
import React from 'react'
import vid1 from '../assets/vid1.mp4'
import logo2 from '../assets/finalLogo-removebg-preview.png'
import logoV from '../assets/white_logo-removebg-preview.png'
import {motion} from 'framer-motion'
import { FaMapPin } from "react-icons/fa";

export default function Hero() {
  return (
    <div>
      
      <section className='relative flex h-screen items-center justify-center '>
  
       
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden ">
            <video src={vid1} autoPlay muted loop playsInline  className='h-full w-full object-cover'></video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>
        <div className="relative z-20 flex h-screen flex-col justify-end items-center pb-5">
  <motion.img
    initial={{
      opacity: 0,
      y: 400,
      rotateY: "180deg",
    }}
    animate={{
      opacity: 1,
      y: 0,
      rotateY: "0deg",
    }}
    transition={{
      duration: 0.8,
      delay: 0.8,
      ease: "linear",

    }}
    src={logoV}
    className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
    alt=""
  />

  <div className="flex flex-col items-center">
    <motion.img
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: 0.5,
        ease: "linear",
      }}
      src={logo2}
      alt=""
      className="w-1/3 lg:w-1/5 sm:w-1/5 mt-2"
    />
    <p className="p-2 text-lg tracking-tighter text-white flex flex-row" > <FaMapPin  className="size-5"/> Marrakech</p>
    
  </div>
</div>


      </section>
    </div>
  )
}