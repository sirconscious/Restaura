import React from 'react'
import about from '../assets/about.jpeg'
import {ABOUT} from "../constants/index"
export default function About() {
  return (
    <section className='container mx-auto mb-8' id='about'>
        <h2 className='text-center text-4xl tracking-tighter mb-11
            lg:text-5xl
        '>About Us</h2>
        <div className="flex flex-wrap">

            <div className="w-full lg:w-1/2">
                <img src={about} alt="#" className='rounded-3xl lg:rotate-3'/>
            </div>
            <div className=" w-full lg:w-1/2 relative ">
                <h2 className='text-4xl lg:text-6xl tracking-tighter ml-11 mb-9 mt-5 sm:mt-5 md:mt-0'>
                    {ABOUT.header}
                </h2>
                <div className="bg-rose-300 lg:rotate-3  w-36 rounded-3xl 
                h-4 absolute top-16 left-14 md:top-12 lg:top-16"></div>
                <div className="ml-11 rounded-lg  ">
                    <p className='text-2xl tracking-tight leading-snug'>{ABOUT.content}</p>
                </div>
            </div>
        </div>
    </section>
  )
}
