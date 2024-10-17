import React from 'react'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
export default function App() {
  return (
    <main className='overflow-y-hidden text-neutral-200'>
      <Hero/>
      <NavBar/>
    </main>
  )
}
