import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './TimeTableForm.css';
import Sidebar from "../components/Sidebar";
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Autocomplete } from "@mui/material";
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure();

const TimeTableForm = () => {

  const timeOptions = [
  '08:30',
  '09:20',
  '10:30',
  '11:20',
  '13:40',
  '14:20',
  '15:30',
  '16:20'
  ].map(time => dayjs(time, 'HH:mm'));

  const [selectedButton, setSelectedButton] = useState("Monday");
  const [selectedCourse, setSelectedCourse] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [endtime, setEndtime] = useState(selectedTime.add(50, "minute"));
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState( () => {
    const saved = localStorage.getItem("timetable");
    return saved ? JSON.parse(saved) : [];
  });
  const [lectureCount, setLectureCount] = useState({});

  const navigate = useNavigate();

  const openingTime = dayjs('08:00', 'HH:mm');
  const closeTime = dayjs('17:00', 'HH:mm');

  useEffect(() => {
    setEndtime(selectedTime.add(50, "minute")); 
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem("timetable", JSON.stringify(timetable));
  }, [timetable]);

  useEffect(() => {
    const fetchCourses = async() => {
      try {
        //console.log("Inside fetchCourses() ");
        const courses = await axios.get("http://localhost:3000/courses");
        setCourses(courses.data);
        //console.log(courses.data);
      } catch(err){
        console.log("Post failed for adding course : ", err);
      }
    };
    fetchCourses();
  }, []);

  const formatDayjsToTime = (dayjsObj) => {
    const date = dayjsObj.toDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleAdd = () => {

    if (!selectedButton || !selectedCourse || !selectedTime) return;

    const currentCount = lectureCount[selectedCourse.courseCode] || 0;
    

    if (currentCount >= selectedCourse.lecturesPerWeek) {
      toast.error(`You cannot schedule more than ${selectedCourse.lecturesPerWeek} lectures for ${selectedCourse.courseCode}`);
      return;
    }

    // Check for overlap
    const overlap = timetable.some(entry => {

      return (
        entry.day === selectedButton &&
        ((selectedTime.isAfter(entry.startTime) && selectedTime.isBefore(entry.endTime)) ||
         (endtime.isAfter(entry.startTime) && endtime.isBefore(entry.endTime)) ||
         (selectedTime.isSame(entry.startTime) || endtime.isSame(entry.endTime))) ||
         (!selectedTime.isAfter(openingTime) || !selectedTime.isBefore(closeTime))
      );
    });

    if (overlap) {
      toast.error("Time slot already occupied!");
      console.log(timetable);
      return;
    }

    setTimetable(timetable => [...timetable, {
      day: selectedButton,
      course: selectedCourse,
      startTime: formatDayjsToTime(selectedTime),
      endTime: formatDayjsToTime(endtime)
    }]);

    setLectureCount(prev => ({
      ...prev,
      [selectedCourse.courseCode]: currentCount + 1
    }));

    toast.success("Course added successfully!");
    setSelectedCourse("");
    setSelectedTime(timeOptions[0]);
    console.log(timetable);
  };

  const handleGenerateTimetable = async () => {
  try {
      const formattedTimetable = timetable.map(item => ({
      day: item.day,
      course: {
        courseCode: item.course.courseCode,
        courseName: item.course.courseName,
        instructorName: item.course.instructorName
      },
      startTime: item.startTime, 
      endTime: item.endTime
    }));
    console.log(formattedTimetable);
    await axios.post("http://localhost:3000/timetables", {timetable : formattedTimetable});
    alert("Timetable saved successfully!");
    } catch (err) {
    console.error("Error saving timetable:", err);
    alert("Failed to save timetable.");
    }
  };

  const handleClick = async () => {
    await handleGenerateTimetable(); 
    navigate("/TimeTable", {state:{timeOptions, timetable}});
  };

  const handleClearTimetable = () => {
    localStorage.removeItem("timetable"); 
    setLectureCount({});
    setTimetable([]);                    
    toast.success("Timetable cleared successfully!");
  };


  const isAddDisabled = !selectedButton || !selectedCourse || !selectedTime;

  return (
    <div className="degree-branch">
      <Sidebar />
      <div className="button-group">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(day => (
          <button key={day} className={selectedButton === day ? "active" : ""} onClick={() => setSelectedButton(day)}>
            {day}
          </button>
        ))}
      </div>
      <div className="dropdown">
        <button>
            <i className="fas fa-cog"></i>
            <span>Select Course</span>
        </button>
        <select className="dropdown-content" value={JSON.stringify(selectedCourse)} onChange={ (e)=> {setSelectedCourse(JSON.parse(e.target.value))} } required>
          <option value="" disabled>
            -- Select a course --
          </option>
          {courses.map(course => <option key={course.courseCode} value={JSON.stringify(course)}>{course.courseName}</option>)}
        </select>
      </div>
      <div className="input-group">
        {/* {selectedCourse != "ADD BREAK" ?
          <div>
            <label htmlFor="hours">No. of hours</label>
            <input type="text" id="hours"  />
          </div>
          :
          <div>
            <label htmlFor="break">Break</label>
            <input type="text" id="break"  />
          </div> 
        } */}
      </div>
      <div className="time-group">
          <div>
              <h2>Start time</h2>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}> 
                <TimePicker label="Basic time picker" value={selectedTime} onChange={(newTime) => setSelectedTime(newTime)}
                renderInput={(params) => <TextField {...params} />} />
                </DemoContainer> 
                </LocalizationProvider> */}

                <Autocomplete
                  options={timeOptions}
                  sx={{width:250, marginTop:2}} 
                  onChange={(event, newValue) => setSelectedTime(newValue)}
                  value={selectedTime}
                  getOptionLabel={(option) =>
                    option ? option.format('hh:mm A') : ''
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select Time" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option && value ? option.format('HH:mm') === value.format('HH:mm') : false
                  }
                  
                />
          </div>
          <div>
              <h2>End time</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                <TimePicker label="Basic time picker"  value={endtime} disabled/>
                </DemoContainer>
                </LocalizationProvider>
          </div>
      </div>
      <div className="action-group">
          <button disabled={isAddDisabled} onClick={handleAdd}>Add</button>
          <button style={{backgroundColor : "purple"}} onClick={handleClearTimetable}>Clear Timetable</button>
          <button onClick={handleClick}>Generate Timetable</button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TimeTableForm;
