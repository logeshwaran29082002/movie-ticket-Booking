import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ListMovie from './pages/ListMovie'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'
function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/listmovies' element={<ListMovie/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/bookings' element={<Booking/>}/>
   </Routes>
    </>
  )
}

export default App
