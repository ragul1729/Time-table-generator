import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './TimeTableSchedule.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar";
import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// const timeSlots = [
//   "08:30", "09:20", "10:10", "11:00", "11:50",
//   "12:10", // Lunch start
//   "13:40", "14:30", "15:20", "16:10"
// ];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


// const initialSchedule = {
//   Monday:    { "08:30": "CS101", "09:20": "MA101", "10:10": "", "11:00": "PH101", "11:50": "", "13:40": "CS101" },
//   Tuesday:   { "08:30": "", "09:20": "PH101", "10:10": "CS101", "11:00": "", "11:50": "MA101", "13:40": "" },
//   Wednesday: { "08:30": "MA101", "09:20": "", "10:10": "CS101", "11:00": "PH101", "11:50": "", "13:40": "" },
//   Thursday:  { "08:30": "", "09:20": "CS101", "10:10": "", "11:00": "MA101", "11:50": "PH101", "13:40": "" },
//   Friday:    { "08:30": "PH101", "09:20": "", "10:10": "MA101", "11:00": "", "11:50": "CS101", "13:40": "" }
// };

const availableColors = [
  'red', 'green', 'blue', 'yellow', 'orange', 'pink', 'purple', 'cyan'
];

const TimeTableSchedule = () => {

  const location = useLocation();
  const tableRef = useRef();

  let { timeOptions, timetable } = location.state || {};

  //console.log(timeOptions);
  timeOptions = timeOptions.map(d => dayjs(d.$d).format('HH:mm'));
  console.log(timetable);

  const initialSchedule = days.reduce((acc, day) => {
    acc[day] = timeOptions.reduce((slotAcc, time) => {
      slotAcc[time] = ""; // empty cell
      return slotAcc;
    }, {});
    return acc;
  }, {});

  timetable.forEach(({ day, startTime, course }) => {
    //console.log( day, startTime, course );
    if (initialSchedule[day] && initialSchedule[day][startTime] !== undefined) {
      initialSchedule[day][startTime] = course.courseCode;
      //console.log("Inside for Each");
    }
  });
  //console.log(initialSchedule);

  const getCourseCode = (day, time) => {
    const slot = timetable.find(
      (t) => t.day === day && t.startTime === time
    );
    return slot ? slot.courseCode : "";
  };
  
  useEffect( () => {
    console.log(localStorage.getItem("timetable"));
  });

  const [schedule, setSchedule] = useState(initialSchedule);
  const [colors, setColors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [colorOptions, setColorOptions] = useState(availableColors);
  const [showModal, setShowModal] = useState(false);
  const [scheduleName, setScheduleName] = useState("");

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleModalOk = async () => {
    if (!scheduleName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/timetables", {
        name: scheduleName,
        timetable : timetable,
        degree : localStorage.getItem("Degree"),
        branch : localStorage.getItem("Branch")
      });
      toast.success("Timetable saved successfully");
      setShowModal(false);
      setScheduleName("");
    } catch (error) {
      toast.error("Failed to save timetable");
      console.error("Save error:", error);
    }
  };

  const handleDoubleClick = (cell, day, time) => {
    if (!cell) return;

    const courseCode = typeof cell === "object" ? cell.code : cell;
    const isColored = colors.hasOwnProperty(courseCode);

    if (isColored) {
      const colorToRemove = colors[courseCode];

      // Remove color from all matching cells
      const updatedSchedule = { ...schedule };
      for (let d in updatedSchedule) {
        for (let t in updatedSchedule[d]) {
          const cellVal = updatedSchedule[d][t];
          if (typeof cellVal === "object" && cellVal.code === courseCode) {
            updatedSchedule[d][t] = courseCode;
          }
        }
      }
      setSchedule(updatedSchedule);

      // Remove from color map and make color available again
      setColors(prev => {
        const updated = { ...prev };
        delete updated[courseCode];
        return updated;
      });

      setColorOptions(prev => [...new Set([...prev, colorToRemove])]);
    } else {
      const usedColors = Object.values(colors);
      const available = availableColors.filter(c => !usedColors.includes(c));

      if (available.length === 0) {
        alert("No more colors available.");
        return;
      }

      setColorOptions(available);
      setSelectedCourse(courseCode);
      setShowPopup(true);
    }
  };

  const handleColorSelect = (color) => {
    const updatedSchedule = { ...schedule };

    for (let d in updatedSchedule) {
      for (let t in updatedSchedule[d]) {
        if (updatedSchedule[d][t] === selectedCourse) {
          updatedSchedule[d][t] = { code: selectedCourse, color };
        }
      }
    }

    setSchedule(updatedSchedule);
    setColors(prev => ({ ...prev, [selectedCourse]: color }));
    setShowPopup(false);
  };

   const downloadPDF = async () => {
    const element = tableRef.current;
    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imageData, "PNG", 20, 20, pdfWidth - 40, pdfHeight);
    pdf.save("timetable.pdf");
  };

  return (
    <div className="schedule-container">

      <Sidebar />
  
      <table className="schedule-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Day / Time</th>
            {timeOptions.map(time => (
              <th key={time}>{time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <th>{day}</th>
              {timeOptions.map(time => {
                const cell = schedule[day]?.[time] || "";
                const course = getCourseCode(day, time);//typeof cell === "string" ? cell : cell.code;
                const color = typeof cell === "object" ? cell.color : colors[course];
                const style = {
                  backgroundColor: color || 'white',
                  cursor: course ? 'pointer' : 'default'
                };

                return (
                  <td
                    key={time}
                    style={style}
                    onDoubleClick={() => handleDoubleClick(cell, day, time)}
                  >
                    {initialSchedule[day][time]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadPDF} className="download-btn">
        Download as PDF
      </button>

      <div>
      <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded" style={{marginTop : 50}}>
        Save
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Save Timetable</h2>
            <input
              type="text"
              placeholder="Enter name"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleModalOk}>OK</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>

      {showPopup && (
        <div className="popup">
          <h3>Select a color for {selectedCourse}</h3>
          <div className="color-options">
            {colorOptions.map(color => (
              <div
                key={color}
                className="color-option"
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTableSchedule;
