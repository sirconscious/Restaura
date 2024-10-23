import React from 'react'
import {SOCIAL_MEDIA_LINKS} from '../constants/index'
export default function Footer() {
  return (
    <div className='mb-8 mt-20 '>
      <div className="flex items-center justify-center gap-8">
            {SOCIAL_MEDIA_LINKS.map((link , index)=>{
                return (
                    <a href={link.href} key={index}>
                        {link.icon}
                    </a>
                )
            })}
      </div>
      <p className='mt-8 text-center tracking-normal text-neutral-500'>
        &copy; All rights reserved
      </p>
    </div>
  )
}
