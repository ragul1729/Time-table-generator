import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import DegreeBranchSelection from './pages/DegreeBranchSelection.jsx'
import TimeTableSchedule from './pages/TimeTableSchedule.jsx'
import PreviousTimeTables from './pages/PreviousTimeTables.jsx'
import TimetableForm from './pages/TimeTableForm.jsx'
import AddCourse from './pages/AddCourse.jsx'
import HomePage from './pages/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <StrictMode> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/degreebranch" element={<DegreeBranchSelection/>}/>
          <Route path="/addcourse" element={<AddCourse/>}/>
          <Route path="/schedule" element={<TimetableForm/>}/>
          <Route path="/TimeTable" element={<TimeTableSchedule/>}/>
          <Route path='PreviousTimeTable' element={<PreviousTimeTables />} />
        </Routes>
    {/* </StrictMode> */}
  </BrowserRouter>
)
