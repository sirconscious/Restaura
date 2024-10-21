import React from 'react' ;
import missionImage from '../assets/mission.jpeg'
import mission from '../assets/mission.mp4'
import {MISSION} from '../constants/index'
export default function Mission() {
  return (
    <section id='mission'>
      <div className="container mx-auto  ">
        <h2 className=' w-full mt-14 mb-9 text-center text-4xl lg:text-6xl tracking-tighter'>
            Our Mission</h2>
            <div className="relative flex justify-center items-center ">
                <video src={mission} type='video/mp4' playsInline className='rounded-3xl w-full' poster={missionImage} autoPlay muted loop></video>
                <div className="absolute w-full h-full bg-black bg-opacity-20 backdrop-blur-sm"></div>
                <p className='absolute text-base text-center text-wrap sm:text-base md:text-2xl lg:text-3xl  p-5 max-w-[780px]  '>
                    {MISSION}</p>
            </div>
      </div>
    </section>
  )
}
