import React from 'react' 
import {CUSINES} from '../constants/index'
export default function Expertise() {
  return (
    <section id='expertise'>
      <h2 className='my-8 text-center text-3xl tracking-tighter lg:text-4xl'>Our Expertise</h2>
      <div className="container mx-auto px-4'">
        {CUSINES.map((cuisine,index)=>{
            return(<div className='flex items-center border-b-4 border-dotted
                border-neutral-700/40 py-2
            ' key={index}>
                    <div className="text-lg sm:text-3xl md:text-4xl">
                        {cuisine.number}
                    </div>
                    <div className="w-1/3 ">
                        <img src={cuisine.image} className='h-auto rounded-lg sm:rounded-3xl' alt={cuisine.title} />
                    </div>
                    <div className="pl-8">
                        <h3 className='text-2xl uppercase tracking-tighter'>
                            {cuisine.title}</h3>
                            <p className='mt-4 text-lg tracking-tight'>{cuisine.description}</p>
                    </div>
            </div>)
        })}
      </div>
    </section>
  )
}
