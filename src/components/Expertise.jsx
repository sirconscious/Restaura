import React from 'react' 
import {CUSINES} from '../constants/index'
import {motion, stagger} from 'framer-motion'
import { useTranslation } from 'react-i18next';
export default function Expertise() {
  const {t}=useTranslation();
  const containerVariant = {
    hidden : {opacity : 0} ,
    show : {opacity : 1 ,
        transition : {
          staggerChildren : 1
        }
    }
  }
  const itemVariants = {
    hidden : {opacity : 0 , y : 20} ,
    show :  {
      opacity: 1 ,
      y : 0 ,
      transition : {
        duration : 0.8
      }
    }
  }
  return (
    <section id='expertise'>
      <h2 className='my-8 text-center text-3xl tracking-tighter lg:text-4xl'>Our Expertise</h2>
      <motion.div
      initial ="hidden" 
      whileInView="show"
      variants={containerVariant}
      
      className="container mx-auto px-4'">
        {CUSINES.map((cuisine,index)=>{
            return(<motion.div 
              variants={itemVariants}
             
              className='flex items-center border-b-4 border-dotted
                border-neutral-700/40 py-2
            ' key={index}>
                    <div className="text-lg sm:text-3xl md:text-4xl">
                        {t(`CUSINES.${index}.number`)}
                    </div>
                    <div className="w-1/4">
                        <img src={cuisine.image} className='h-auto rounded-lg sm:rounded-3xl' alt={cuisine.title} />
                    </div>
                    <div className="pl-8">
                        <h3 className='text-2xl uppercase tracking-tighter'>
                        {t(`CUSINES.${index}.title`)}</h3>
                            <p className='mt-4 text-lg tracking-tight'> {t(`CUSINES.${index}.description`)}</p>
                    </div>
            </motion.div>)
        })}
      </motion.div>
    </section>
  )
}
