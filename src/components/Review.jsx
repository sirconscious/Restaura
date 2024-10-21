import React from 'react'
import  {REVIEW} from '../constants/index'
import xaviour from '../assets/xaviour.jpeg'
import customer1 from '../assets/customer1.jpeg'
import customer2 from '../assets/customer2.jpeg'
import customer3 from '../assets/customer3.jpeg'
import customer4 from '../assets/customer4.jpeg'
export default function Review() {
  return (
    <section className='container mx-auto mb-8 mt-12'>
        <div className="flex flex-col">
            <p className='mb-10 text-3xl font-light leading-normal 
                lg:mx-40 lg:text-[3.5rem]
            '>
                    {REVIEW.content}
            </p>
            <div className="flex items-center justify-center gap-6">
                <img src={xaviour} width={80} height={80} className='rounded-full border' />
                <div className="tracking-tighter">
                    <h6>
                        {REVIEW.name}
                    </h6>
                    <p className='text-sm text-neutral-500'>
                        {REVIEW.profession}
                    </p>
                </div>
            </div>
        </div>
        <div className="mt-14 flex flex-col items-center 
        justify-center gap-2 md:flex-row ">
            {[customer1 , customer2 , customer3 , customer4].map((customer,index)=>{
                return(
                    <img key={index} src={customer} className='
                    h-[350px] w-[250px] rounded-br-3xl rounded-tl-3xl object-cover' />
                )
            })}
        </div>
    </section >
  )
}
