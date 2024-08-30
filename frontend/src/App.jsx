import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Route,Routes} from 'react-router-dom'
import OtherInquiry from './pages/OtherInquiry/OtherInquiry'
import InquiryHome from './pages/InquiryHome/InquiryHome'
import DiseaseInquiry from './pages/DiseaseInquiry/diseaseInquiry'
import ViewDiseaseInquiry from './pages/DiseaseInquiry/ViewDiseaseInquiry'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/inquiryHome' element={<InquiryHome/>} />
        <Route path='/diseaseInquiry' element={<DiseaseInquiry/>}/>
        <Route path='/otherInquiry' element={<OtherInquiry/>} />
        <Route path='/viewDiseaseInquiry' element={<ViewDiseaseInquiry/>} />
      </Routes>
    </div>
  )
}

export default App