import React from 'react'
import video from "../assets/hero.mp4"
import logo from "../assets/logo.png"
import hero from "../assets/hero.jpeg"
import vid1 from '../assets/vid1.mp4'
import logo2 from '../assets/finalLogo-removebg-preview.png'
import logoV from '../assets/white_logo-removebg-preview.png'
import {motion} from 'framer-motion'
export default function Hero() {
  return (
    <div>
      <section className='relative flex h-screen items-center justify-center '>
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden ">
            <video src={vid1} autoPlay muted loop playsInline  className='h-full w-full object-cover'></video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>
        <div className="realtive z-20 flex h-screen  flex-row justify-center items-end pb-5">

        <motion.img
        initial = {{
          opacity: 0,
          x : -400 ,
          rotateY : "180deg"
        }}
        animate = {{
          opacity: 1 ,
          x : 0,
          rotateY : "0deg"
        }}
        transition={{duration : 1
          , delay : 0.6

}}
         src={logoV} className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6" alt="" />
         
         <div className="">
        
            <motion.img 
            initial = {{
              opacity: 0,
              y : 40
            }}
            animate = {{
              opacity: 1 ,
              y : 0
            }}
            transition={{duration : 0.4
                      , delay : 0.9,
                      ease : "linear"
            }}
            src={logo2} alt="" className=' p-4' />

            <p className='p-4 text-lg tracking-tighter text-white'>Moroccoooooooo</p>

         </div>
        </div>
      </section>
    </div>
  )
}
