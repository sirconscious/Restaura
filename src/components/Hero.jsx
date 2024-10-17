import React from 'react'
import video from "../assets/hero.mp4"
import logo from "../assets/logo.png"
import hero from "../assets/hero.jpeg"
export default function Hero() {
  return (
    <div>
      <section className='relative flex h-screen items-center justify-center '>
        <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden ">
            <video src={video} autoPlay muted loop playsInline  poster={hero} className='h-full w-full object-cover'></video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>
        <div className="realtive z-20 flex h-screen flex-col justify-end pb-20">
            <img src={logo} alt="" className='w-full p-4' />
            <p className='p-4 text-lg tracking-tighter text-white'>Paris</p>
        </div>
      </section>
    </div>
  )
}
