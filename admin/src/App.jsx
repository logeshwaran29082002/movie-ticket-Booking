import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import ListMovie from './pages/ListMovie'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/listmovies' element={<ListMovie/>}/>
   </Routes>
    </>
  )
}

export default App
