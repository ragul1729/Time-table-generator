import React, { useState } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { TimePicker } from "@mui/lab";
//import { LocalizationProvider } from '@mui/x-date-pickers'
import LocalizationProvider from "@mui/lab/LocalizationProvider";
//import { MuiLocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
//import { AdapterDateFnsv3 } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { useNavigate } from "react-router-dom";

const daysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimetableForm = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [hours, setHours] = useState("");
  const [breakName, setBreakName] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleAddEntry = () => {
    if (!selectedDay || !selectedCourse || !startTime || !endTime) {
      setError("All fields are required!");
      return;
    }

    // Check for time conflicts
    const newEntry = { day: selectedDay, course: selectedCourse, startTime, endTime, type: selectedCourse === "ADD BREAK" ? "Break" : "Course", hours, breakName };
    const conflict = entries.some(
      (entry) =>
        entry.day === selectedDay &&
        ((startTime >= entry.startTime && startTime < entry.endTime) ||
          (endTime > entry.startTime && endTime <= entry.endTime))
    );

    if (conflict) {
      setError("Time conflict detected!");
      return;
    }

    setEntries([...entries, newEntry]);
    setError("");
  };

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <div className="flex space-x-2">
        {daysList.map((day) => (
          <button
            key={day}
            className={`px-4 py-2 border rounded-md ${
              selectedDay === day ? "bg-cyan-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleDayClick(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="relative">
        <TextField
          select
          label="Select Course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          fullWidth
        >
          <MenuItem value="Course 1">Course 1</MenuItem>
          <MenuItem value="Course 2">Course 2</MenuItem>
          <MenuItem value="Course 3">Course 3</MenuItem>
          <MenuItem value="ADD BREAK">ADD BREAK</MenuItem>
        </TextField>
      </div>

      {selectedCourse && selectedCourse !== "ADD BREAK" && (
        <TextField
          label="No. of hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          fullWidth
        />
      )}

      {selectedCourse === "ADD BREAK" && (
        <TextField
          label="Break"
          value={breakName}
          onChange={(e) => setBreakName(e.target.value)}
          fullWidth
        />
      )}

      <div className="flex space-x-4">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div>
            <p className="text-lg font-semibold text-center">Start time</p>
            <TimePicker
              value={startTime}
              onChange={(newValue) => setStartTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-center">End time</p>
            <TimePicker
              value={endTime}
              onChange={(newValue) => setEndTime(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <Button variant="contained" color="primary" onClick={handleAddEntry}>
        Add
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/timetable")}
      >
        Generate Timetable
      </Button>
    </div>
  );
};

export default TimetableForm;
