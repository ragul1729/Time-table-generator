import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DegreeBranchSelection from './pages/DegreeBranchSelection.jsx'
import TimeTableList from './pages/TimeTableList.jsx'
import Timetable from './pages/TimeTable.jsx'
import TimetableForm from './pages/TimeTableForm.jsx'
import AddCourse from './pages/AddCourse.jsx'
import HomePage from './pages/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <StrictMode> */}
      <AddCourse />
    {/* </StrictMode> */}
  </BrowserRouter>
)
