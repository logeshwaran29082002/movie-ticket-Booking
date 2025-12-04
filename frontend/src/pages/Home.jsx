import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Movies from '../components/Movies'
import Trailers from '../components/Trailers'
function Home() {
  return (
    <div>
      <Navbar/>
      <Banner/>
      <Movies/>
      <Trailers/>
    </div>
  )
}

export default Home
