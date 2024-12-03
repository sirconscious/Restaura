import React from 'react'
import { CONTACT } from '../constants'
import { useTranslation } from 'react-i18next';
export default function ContactSection() {
  const {t}=useTranslation();
  return (
    <section className=' container mx-auto py-16' id='contact'>
      <h2 className='mb-8 text-center text-3xl lg:text-4xl'>Contact Us</h2>
        <div className="text-neutral-400">
            {CONTACT.map((detail,i)=>(
                <p key={t(`CONTACT.${i}.key`)} 
                className='my-20 border-b-2 border-dotted border-neutral-700
                pb-12 text-center text-2xl md:text-3xl sm:text-2xl'>
                    {t(`CONTACT.${i}.value`)}
                </p>
            ))}
        </div>
    </section>
  )
}
