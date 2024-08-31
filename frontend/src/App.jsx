import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import RemedyListView from './pages/Treat/RemedyListView'
import RemedyDetailView from './pages/Treat/RemedyDetailView'
import Home from './pages/Treat/Home'
import About from './pages/Treat/About'
import Footer from './components/Footer/Footer'


const App = () => {
  const url = "http://localhost:4000"
  return (
    <div>
      <Navbar/>
      <div className='app'>
      <Routes>
        <Route path='/RemedyListView' element={<RemedyListView  url={url}/>}/>
        <Route path="/remedy-detail-view/:id" element={<RemedyDetailView url={url} />} />
        <Route path="/" element={<Home url={url} />} />
        <Route path="/About" element={<About url={url} />} />
      </Routes>
    </div>
    <Footer/>
    </div>
    
  )
}

export default App