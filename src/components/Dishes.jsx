import React from 'react'
import {DISHES} from '../constants/index'
import { useTranslation } from 'react-i18next';
import DishCard from './DishCard'
export default function Dishes() {
  const { t } = useTranslation(); 
  return (
    <section className='container mx-auto py-16' id='dishes'>
      <h2 className='mb-8 text-center  text-3xl tracking-tighter lg:text-4xl'>
           Our Popular Dishes
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
        {DISHES.map((dish , index )=>{
            return ( <DishCard 
              key={index} 
              project={{
                image: dish.image,
                title: t(dish.title),  // Translate the dish title
                description: t(dish.description),  // Translate the dish description
                rating: dish.rating,
                price: dish.price
              }} 
            />)
        })}
      </div>
    </section>
  )
}
