import React, { useEffect, useState } from "react";
import './TimeTableForm.css';
import Sidebar from "../components/Sidebar";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
const DropdownMenu = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  return (
    <div className="relative inline-block w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-lg font-semibold text-black bg-purple-200 rounded-lg shadow-md focus:outline-none"
      >
        <span>⚙️ {title}</span>
      </button>
      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-purple-100 border border-gray-300 rounded-lg shadow-lg">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-purple-300"
              onClick={() => setIsOpen(false)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>

  );
};

const TimeTableForm = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState(dayjs());
  const [endtime, setEndtime] = useState(dayjs().add(50, "minute"));

  const changeTime = (newTime) => {
    //console.log(newTime.format("HH:mm"));
    setSelectedTime(newTime);
    //console.log(selectedTime.format("HH:mm"));
    //setEndtime(newTime);
    //setEndtime(selectedTime.add(10, "minute"));
    //console.log(endtime);
    //console.log(selectedTime.format("HH:mm"));
  }

  useEffect(() => {
    setEndtime(selectedTime.add(50, "minute"));
  }, [selectedTime])

  return (
    <div className="degree-branch">
      <Sidebar />
      <div className="button-group">
          <button key="Monday" className={`${selectedButton == "Monday" ? "active" : ""}`} onClick={ ()=> {setSelectedButton("Monday")} }>Monday</button>
          <button key="Tuesday" className={`${selectedButton == "Tuesday" ? "active" : ""}`} onClick={ ()=> {setSelectedButton("Tuesday")} }>Tuesday</button>
          <button key="Wednesday" className={`${selectedButton == "Wednesday" ? "active" : ""}`} onClick={ ()=> {setSelectedButton("Wednesday")} }>Wednesday</button>
          <button key="Thursday" className={`${selectedButton == "Thursday" ? "active" : ""}`} onClick={ ()=> {setSelectedButton("Thursday")} }>Thursday</button>
          <button key="Friday" className={`${selectedButton == "Friday" ? "active" : ""}`} onClick={ ()=> {setSelectedButton("Friday")} }>Friday</button>
      </div>
      <div className="dropdown">
          <button>
              <i className="fas fa-cog"></i>
              <span>Select Course</span>
          </button>
          {/* <div className="dropdown-content">
              <button>Course 1</button>
              <button>Course 2</button>
              <button>Course 3</button>
              <button>ADD BREAK</button>
          </div> */}
          <select className="dropdown-content" value={selectedCourse} onChange={ (e)=> {setSelectedCourse(e.target.value)} }>
            <option value="Course 1">Course 1</option>
            <option value="Course 2">Course 2</option>
            <option value="Course 3">Course 3</option>
            <option value="ADD BREAK">ADD BREAK</option>
          </select>
      </div>
      <div className="input-group">
        {selectedCourse != "ADD BREAK" ?
          <div>
            <label htmlFor="hours">No. of hours</label>
            <input type="text" id="hours"  />
          </div>
          :
          <div>
            <label htmlFor="break">Break</label>
            <input type="text" id="break"  />
          </div> 
        }
      </div>
      {/* <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker label="Basic time picker" />
        </DemoContainer>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker']}>
          <TimePicker label="Basic time picker"  value={dayjs('2022-04-17T15:30')} readOnly/>
        </DemoContainer>
        </LocalizationProvider>
      </div> */}
      <div className="time-group">
          <div>
              <h2>Start time</h2>
              {/* <div className
              ="time-box">
                  <p>Enter time</p>
                  <div className="time-inputs">
                      <input type="text" value="20" />
                      <span>:</span>
                      <input type="text" value="00" />
                  </div>
                  <div className="am-pm-buttons">
                      <button className="am">AM</button>
                      <button className="pm">PM</button>
                  </div>
                  <div className="action-buttons">
                      <button>Cancel</button>
                      <button className="ok">OK</button>
                  </div>
              </div> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                <TimePicker label="Basic time picker" value={selectedTime} onChange={(newTime) => {setSelectedTime(newTime);}}
                renderInput={(params) => <TextField {...params} />}/>
                </DemoContainer>
                </LocalizationProvider>
          </div>
          <div>
              <h2>End time</h2>
              {/* <div className="time-box">
                  <p>Enter time</p>
                  <div className="time-inputs">
                      <input type="text" value="20" />
                      <span>:</span>
                      <input type="text" value="00" />
                  </div>
                  <div className="am-pm-buttons">
                      <button className="am">AM</button>
                      <button className="pm">PM</button>
                  </div>
                  <div className="action-buttons">
                      <button>Cancel</button>
                      <button className="ok">OK</button>
                  </div>
              </div> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                <TimePicker label="Basic time picker"  value={endtime} disabled/>
                </DemoContainer>
                </LocalizationProvider>
          </div>
      </div>
      <div className="action-group">
          <button>Add</button>
          <button>Generate Timetable</button>
      </div>
    </div>
  );
};

export default TimeTableForm;
