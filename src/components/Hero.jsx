import React from 'react'
import video from "../assets/hero.mp4"
import logo from "../assets/logo.png"
import hero from "../assets/hero.jpeg"
import vid1 from '../assets/vid1.mp4'
import logo2 from '../assets/ccc-removebg-preview.png'
import {motion} from 'framer-motion'
export default function Hero() {
  return (
    <div>
      <section className='relative flex h-screen items-center justify-center '>
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden ">
            <video src={vid1} autoPlay muted loop playsInline  poster={hero} className='h-full w-full object-cover'></video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>
        <div className="realtive z-20 flex h-screen flex-col justify-end pb-20">
            <motion.img 
            initial = {{
              opacity: 0,
              y : 50 
            }}
            animate = {{
              opacity: 1 ,
              y : 0
            }}
            transition={{duration : 0.6
                      , delay : 1

            }}
            src={logo2} alt="" className='w-full p-4' />
            <p className='p-4 text-lg tracking-tighter text-white'>Marrakech</p>
        </div>
      </section>
    </div>
  )
}
