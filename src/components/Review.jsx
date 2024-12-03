import React, { useState } from 'react'
import  {REVIEW} from '../constants/index'
import { useTranslation } from 'react-i18next'; 
import xaviour from '../assets/xaviour.jpeg'
import customer1 from '../assets/customer1.jpeg'
import customer2 from '../assets/customer2.jpeg'
import customer3 from '../assets/customer3.jpeg'
import customer4 from '../assets/customer4.jpeg'
import {motion} from 'framer-motion'
export default function Review() {
const {t}=useTranslation();
    const containerVariants = {
        hidden : {opacity : 0},
        show : {opacity : 1} ,
        transition :{
            staggerChildren : 0.8 ,
        }
    }
    const itemVariants = {
        hidden : {
            opacity: 0 ,
            y : 20
        } ,
        show : {
            opacity: 1 ,
            y : 0
        },
        transition : {
            duration : 0.5
        }
    }
  return (
    <section id='review' className='container mx-auto mb-8 mt-12'>
        <motion.div
            
            initial ={{
                opacity: 0 ,
                y :50,
            }}
            whileInView={{
                opacity: 1 ,
                y : 0
            }}
            transition={{
                duration : 1 ,
                delay : 1
            }}
        className="flex flex-col">
            <p className='mb-10 text-3xl font-light leading-normal 
                lg:mx-40 lg:text-[3.5rem]
            '>
                    {t('REVIEW.0.content')}
            </p>
            <div className="flex items-center justify-center gap-6">
                <img src={xaviour} width={80} height={80} className='rounded-full border' />
                <div className="tracking-tighter">
                    <h6>
                    {t('REVIEW.0.name')}
                    </h6>
                    <p className='text-sm text-neutral-500'>
                    {t('REVIEW.0.profession')}
                    </p>
                </div>
            </div>
        </motion.div>
        <div className="mt-14 flex flex-col items-center 
        justify-center gap-2 md:flex-row ">
            {[customer1 , customer2 , customer3 , customer4].map((customer,index)=>{
                return(
                    <img
                                    key={index} src={customer} className='
                    h-[350px] w-[250px] rounded-br-3xl rounded-tl-3xl object-cover' />
                )
            })}
        </div>
    </section >
  )
}
