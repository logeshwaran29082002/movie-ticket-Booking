import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Movie from './pages/Movie'
import Release from './pages/Release'
import Booking from './pages/Booking'
import Contact from './pages/Contact'
import MovieDetailPages from './pages/MovieDetailPages'
function App() {
  return (
    <>
    <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/movies' element={<Movie/>} />
    <Route path='/releases' element={<Release/>} />
    <Route path='/bookings' element={<Booking/>} />
    <Route path='/contact' element={<Contact/>} />
    <Route path='/movies' element={<MovieDetailPages/>} />
    

    </Routes>
    </>
  )
}

export default App
