import React from 'react'
import {DISHES} from '../constants/index'
import DishCard from './DishCard'
export default function Dishes() {
  return (
    <section className='container mx-auto py-16' id='dishes'>
      <h2 className='mb-8 text-center  text-3xl tracking-tighter lg:text-4xl'>
        Our Popular  Dishes
      </h2>
      <div className="cards grid gird-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
      <style>
                {`
                    .cards:hover > :not(:hover) {
                        filter: blur(2px);
                        opacity: 0.8;
                        transition: filter 0.3s ease, opacity 0.3s ease;
                    }
                `}
            </style>
        {DISHES.map((project , index )=>{
            return (<DishCard key={index} project={project}/>)
        })}
      </div>
    </section>
  )
}
