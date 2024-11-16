import React from 'react' ;
import missionImage from '../assets/mission.jpeg'
import mission from '../assets/mission.mp4'
import {MISSION} from '../constants/index'
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next';
export default function Mission() {
  const { t } = useTranslation(); 
  return (
    <section id='mission'>
      <div className="container mx-auto  ">
        <h2 className=' w-full mt-14 mb-9 text-center text-4xl lg:text-6xl tracking-tighter'>
            Our Mission</h2>
            <div className="relative flex justify-center items-center ">
                <motion.video 
                initial ={{
                  opacity: 0 ,

                }}
                whileInView={{
                  opacity: 1
                }}
                transition={{
                  duration : 1
                  
                }}
                src={mission} type='video/mp4' 
                playsInline className='rounded-3xl w-full'
                 poster={missionImage} autoPlay muted loop></motion.video>
                <motion.div
                initial ={{
                  opacity: 0
                }}
                whileInView={{
                  opacity: 1
                }}
                transition={{
                  duration : 0.5 ,
                  delay : 0.5
                }}
                className="absolute w-full h-full bg-black bg-opacity-20 backdrop-blur-sm"></motion.div>
                <motion.p
                initial = {{
                  opacity: 0 , 
                  y: 20 
                }}
                whileInView={{
                  opacity: 1
                  , y : 0
                }}
                transition={{
                  duration : 1 ,
                  delay : 0.5
                }}
                className='absolute text-base text-center text-wrap sm:text-base md:text-2xl lg:text-3xl  p-5 max-w-[780px]  '>
                    {t('MISSION')}</motion.p>
            </div>
      </div>
    </section>
  )
}
