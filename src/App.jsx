import React from 'react'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import LoginPage from './pages/LoginPage'
import LoginPage02 from './pages/LoginPage02'
import {BrowserRouter , Routes, Route , Link} from 'react-router-dom'
export default function App() {
  return (
    <main className="overflow-y-hidden text-neutral-200">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/signup' element={<LoginPage/>}/>
        <Route path='/Login' element={<LoginPage02/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </main>
  )
}

