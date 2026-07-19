import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './TimeTableForm.css';
import Sidebar from "../components/Sidebar";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure();

const TimeTableForm = () => {

  dayjs.extend(customParseFormat);

  const breakOption = {
    courseCode: "BREAK",
    courseName: "Break",
    instructorName: ""
  };
  
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

  const navigate = useNavigate();
  const location = useLocation();
  const savedTimetable = location.state?.savedTimetable || null;
  const initialTimetable = location.state?.timetable || null;

  const [selectedButton, setSelectedButton] = useState("Monday");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState(timeOptions[0]);
  const [durationHours, setDurationHours] = useState("1");
  const [durationError, setDurationError] = useState("");
  const [breakName, setBreakName] = useState("");
  const [breakNameError, setBreakNameError] = useState("");
  const [endtime, setEndtime] = useState(selectedTime.add(1, "hour"));
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState( () => {
    if (initialTimetable) {
      return initialTimetable;
    }

    const saved = localStorage.getItem("timetable");
    return saved ? JSON.parse(saved) : [];
  });
  const [lectureCount, setLectureCount] = useState(() => {
    const sourceTimetable = initialTimetable || [];

    return sourceTimetable.reduce((counts, entry) => {
      const courseCode = entry.course?.courseCode;

      if (courseCode && courseCode !== breakOption.courseCode) {
        counts[courseCode] = (counts[courseCode] || 0) + 1;
      }

      return counts;
    }, {});
  });

  const openingTime = dayjs('08:00', 'HH:mm');
  const closeTime = dayjs('17:00', 'HH:mm');

  useEffect(() => {
    const duration = Number(durationHours);

    if (selectedTime && Number.isFinite(duration) && duration >= 1 && duration <= 5) {
      setEndtime(selectedTime.add(duration * 60, "minute"));
    }
  }, [selectedTime, durationHours]);

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

  const validateDurationHours = (value) => {
    if (!value) {
      return "No. of hours is required";
    }

    const duration = Number(value);
    if (!Number.isFinite(duration) || duration < 1 || duration > 5) {
      return "No. of hours must be between 1 and 5";
    }

    return "";
  };

  const handleDurationChange = (event) => {
    const numericValue = event.target.value.replace(/[^\d.]/g, "");
    const singleDecimalValue = numericValue
      .replace(/(\..*)\./g, "$1")
      .replace(/^0+(?=\d)/, "");

    setDurationHours(singleDecimalValue);
    setDurationError(validateDurationHours(singleDecimalValue));
  };

  const validateBreakName = (value) => {
    if (!value.trim()) {
      return "Break name is required";
    }

    return "";
  };

  const handleCourseChange = (event) => {
    const nextCourse = event.target.value ? JSON.parse(event.target.value) : "";
    setSelectedCourse(nextCourse);

    if (!nextCourse || nextCourse.courseCode !== breakOption.courseCode) {
      setBreakName("");
      setBreakNameError("");
    }
  };

  const handleBreakNameChange = (event) => {
    setBreakName(event.target.value);
    setBreakNameError(validateBreakName(event.target.value));
  };

  const handleAdd = () => {

    if (!selectedButton || !selectedCourse || !selectedTime) return;

    const durationValidationMessage = validateDurationHours(durationHours);
    if (durationValidationMessage) {
      setDurationError(durationValidationMessage);
      toast.error(durationValidationMessage);
      return;
    }

    const isBreak = selectedCourse.courseCode === breakOption.courseCode;
    const currentCount = lectureCount[selectedCourse.courseCode] || 0;

    const breakNameValidationMessage = isBreak ? validateBreakName(breakName) : "";
    if (breakNameValidationMessage) {
      setBreakNameError(breakNameValidationMessage);
      toast.error(breakNameValidationMessage);
      return;
    }

    if (!isBreak && currentCount >= selectedCourse.lecturesPerWeek) {
      toast.error(`You cannot schedule more than ${selectedCourse.lecturesPerWeek} lectures for ${selectedCourse.courseCode}`);
      return;
    }

    if (selectedTime.isBefore(openingTime) || endtime.isAfter(closeTime)) {
      toast.error("Selected duration must fit between 08:00 and 17:00");
      return;
    }

    const overlap = timetable.some(entry => {
      if (entry.day !== selectedButton) return false;

      const entryStart = dayjs(entry.startTime, "HH:mm");
      const entryEnd = dayjs(entry.endTime, "HH:mm");
      return selectedTime.isBefore(entryEnd) && endtime.isAfter(entryStart);
    });

    if (overlap) {
      toast.error("Time slot already occupied!");
      console.log(timetable);
      return;
    }

    const scheduledCourse = isBreak
      ? {
          ...breakOption,
          courseName: breakName.trim()
        }
      : selectedCourse;

    setTimetable(timetable => [...timetable, {
      day: selectedButton,
      course: scheduledCourse,
      startTime: formatDayjsToTime(selectedTime),
      endTime: formatDayjsToTime(endtime)
    }]);

    if (!isBreak) {
      setLectureCount(prev => ({
        ...prev,
        [selectedCourse.courseCode]: currentCount + 1
      }));
    }

    toast.success(isBreak ? "Break added successfully!" : "Course added successfully!");
    setSelectedCourse("");
    setSelectedTime(timeOptions[0]);
    setDurationHours("1");
    setDurationError("");
    setBreakName("");
    setBreakNameError("");
    console.log(timetable);
  };

  // const handleGenerateTimetable = async () => {
  // try {
  //     const formattedTimetable = timetable.map(item => ({
  //     day: item.day,
  //     course: {
  //       courseCode: item.course.courseCode,
  //       courseName: item.course.courseName,
  //       instructorName: item.course.instructorName
  //     },
  //     startTime: item.startTime, 
  //     endTime: item.endTime
  //   }));
  //   console.log(formattedTimetable);
  //   await axios.post("http://localhost:3000/timetables", {timetable : formattedTimetable});
  //   alert("Timetable saved successfully!");
  //   } catch (err) {
  //   console.error("Error saving timetable:", err);
  //   alert("Failed to save timetable.");
  //   }
  // };

  const handleClick = async () => {
    const hasScheduledCourse = timetable.some(entry => entry.course?.courseCode !== breakOption.courseCode);
    if (!hasScheduledCourse) {
      toast.error("Add at least one course before generating the timetable");
      return;
    }

    //await handleGenerateTimetable(); 
    navigate("/TimeTable", {
      state: {
        timeOptions,
        timetable,
        savedTimetable,
        mode: savedTimetable ? "edit" : "create"
      }
    });
  };

  const handleClearTimetable = () => {
    localStorage.removeItem("timetable"); 
    setLectureCount({});
    setTimetable([]);                    
    toast.success("Timetable cleared successfully!");
  };


  const isBreakSelected = selectedCourse?.courseCode === breakOption.courseCode;
  const hasValidDuration = !validateDurationHours(durationHours);
  const hasValidBreakName = !isBreakSelected || !validateBreakName(breakName);
  const isWithinWorkingHours = selectedTime && !selectedTime.isBefore(openingTime) && !endtime.isAfter(closeTime);
  const hasTimeOverlap = selectedTime && timetable.some(entry => {
    if (entry.day !== selectedButton) return false;

    const entryStart = dayjs(entry.startTime, "HH:mm");
    const entryEnd = dayjs(entry.endTime, "HH:mm");
    return selectedTime.isBefore(entryEnd) && endtime.isAfter(entryStart);
  });
  const hasScheduledCourse = timetable.some(entry => entry.course?.courseCode !== breakOption.courseCode);
  const isAddDisabled =
    !selectedButton ||
    !selectedCourse ||
    !selectedTime ||
    !hasValidDuration ||
    !hasValidBreakName ||
    !isWithinWorkingHours ||
    hasTimeOverlap;
  const isGenerateDisabled = !hasScheduledCourse;

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
        <select
          className="dropdown-content"
          value={selectedCourse ? JSON.stringify(selectedCourse) : ""}
          onChange={handleCourseChange}
          required
        >
          <option value="" disabled>
            -- Select a course --
          </option>
          <option value={JSON.stringify(breakOption)}>Add Break</option>
          {courses.map(course => <option key={course.courseCode} value={JSON.stringify(course)}>{course.courseName}</option>)}
        </select>
      </div>
      <div className="input-group duration-field">
        <div>
          <label htmlFor="breakName">Break name</label>
          <input
            type="text"
            id="breakName"
            placeholder="e.g. Lunch"
            value={breakName}
            onChange={handleBreakNameChange}
            disabled={!isBreakSelected}
          />
          {breakNameError && <span className="field-error">{breakNameError}</span>}
        </div>
      </div>
      <div className="input-group duration-field">
        <div>
          <label htmlFor="hours">No. of hours</label>
          <input
            type="text"
            id="hours"
            inputMode="decimal"
            placeholder="1-5 hours"
            value={durationHours}
            onChange={handleDurationChange}
          />
          {durationError && <span className="field-error">{durationError}</span>}
        </div>
      </div>
      <div className="time-group">
          <div>
              <h2>Start time</h2>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}> 
                <TimePicker
                  label="Start time"
                  value={selectedTime}
                  onChange={(newTime) => {
                    if (newTime) {
                      setSelectedTime(newTime);
                    }
                  }}
                />
                </DemoContainer> 
                </LocalizationProvider>
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
          <button disabled={isGenerateDisabled} onClick={handleClick}>Generate Timetable</button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TimeTableForm;
