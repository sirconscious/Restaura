import React from 'react'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {BrowserRouter , Routes, Route , Link} from 'react-router-dom'
import Reservations from './pages/Reservations'
import Payment from './pages/Payment'
import Layout from './pages/Dashboard'
export default function App() {
  return (
    <main className="overflow-y-hidden ">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavBar className="text-neutral-200"/>}>
        <Route index element={<HomePage/>}/>
        
        
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Reservations' element={<Reservations/>}/>
        <Route path='/Payment' element={<Payment/>}/>
      <Route path='/Dashboard' element={<Layout/>}/>
    </Routes>
    </BrowserRouter>
    </main>
  )
}

