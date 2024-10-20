import React from 'react'
import { useState } from 'react'
import logo from '../assets/logo.png'
import {LINKS} from '../constants/index'
import { FaTimes } from 'react-icons/fa'
import { FaBars } from 'react-icons/fa6'
export default function NavBar() {
  const [isMobilemenuOpen , setIsMobileMenuOpen] = useState(false)
  const togleMenu = ()=>{
    setIsMobileMenuOpen(prevState => !prevState)
  }
  const handleScroll = (event , targetId)=>{
        event.preventDefault()
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
              const offsetTopp = targetElement.offsetTop - 80
              window.scrollTo({
                top: offsetTopp ,
                behavior: "smooth",
              })
        }
  }
  return (
    <nav className='fixed top-4 z-50 
    flex w-full flex-col items-center justify-center'>
      <div className="flex w-full items-center justify-between overflow-y-hidden
      backdrop-blur-lg lg:m-2 lg:w-[50rem] lg:rounded-full lg:shadow-lg py-5 px-4">
        <img src={logo} alt="" width={80} height={22}/> 
        <div className="hidden space-x-6 lg:flex">
          {LINKS.map((link, index)=>{
            return <a key={index} href={`#${link.targetId}`} className={`text-sm ${ index ==0 ?"border-l-0":"border-l-2 border-neutral-300/20" } hover:opacity-50 `}
            onClick={(e)=> handleScroll(e,link.targetId)}  
          >{link.text}</a>
          })}
        </div>
        <div className="lg:hidden">
          <button onClick={togleMenu}>
            {isMobilemenuOpen? <FaTimes></FaTimes> : <FaBars></FaBars>}
          </button>
        </div>
       
        </div>
        {
          isMobilemenuOpen && (

            <div className="w-full backdrop-blur-lg lg:hidden">
               {LINKS.map((link , index)=>{
                return <a key={index} href={`#${link.targetId}`} className='block p-4 uppercase tracking-tighter '
                onClick={(e)=> handleScroll(e,link.targetId)}>{link.text}</a>
               })}
            </div>
          )
        }
    </nav>
  )
}
