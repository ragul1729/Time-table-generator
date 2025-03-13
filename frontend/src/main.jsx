import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import DegreeBranchSelection from './pages/DegreeBranchSelection.jsx'
import Timetable from './pages/TimeTable.jsx'
import PreviousTimeTables from './pages/PreviousTimeTables.jsx'
import TimetableForm from './pages/TimeTableForm.jsx'
import AddCourse from './pages/AddCourse.jsx'
import HomePage from './pages/HomePage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* <StrictMode> */}
      <PreviousTimeTables />
    {/* </StrictMode> */}
  </BrowserRouter>
)
