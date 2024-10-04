import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

import { Route, Routes } from 'react-router-dom'

import Dashboard from './pages/Dashboard/Dashboard'
import Disease from './pages/Disease/Disease'


import AddNewRemedies from './pages/Treat/AddNewRemedies'

import User from './pages/User/User'
import Prediction from './pages/Prediction/Prediction'
import ViewInquiries from './pages/Inquiry/Inquiry'

const App = () => {

  const url = "http://localhost:4000"

  return (
    <div>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>}/>

          <Route path="/disease" element={<Disease url={url} />}/>


          <Route path="/AddNewRemedies" element={<AddNewRemedies url={url} />} />

          <Route path="/user" element={<User/>}/>

          <Route path="/prediction" element={<Prediction/>}/>

          <Route path="/viewInquiry" element={<ViewInquiries/>}/>



        </Routes>
      </div>
    </div>
  )
}

export default App
