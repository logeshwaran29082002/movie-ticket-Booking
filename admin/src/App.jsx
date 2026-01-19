import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import './App.css'
import AddPage from './components/AddPage'

function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/' element={<AddPage/>}/>
   </Routes>
    </>
  )
}

export default App
