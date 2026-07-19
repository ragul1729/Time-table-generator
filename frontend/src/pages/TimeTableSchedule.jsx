import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './TimeTableSchedule.css';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar";
import dayjs from 'dayjs';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
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

  let { timeOptions, timetable, savedTimetable: initialSavedTimetable, mode } = location.state || {};
  timetable = timetable || [];
  const isViewMode = mode === "view";

  //console.log(timeOptions);
  const routeTimeOptions = timeOptions
    ? timeOptions
        .map(d => dayjs(d.$d || d).format('HH:mm'))
        .filter(time => time !== "Invalid Date")
    : [];
  timeOptions = [...new Set([
    ...routeTimeOptions,
    ...timetable.map(entry => entry.startTime)
  ])].sort((a, b) => dayjs(a, "HH:mm").diff(dayjs(b, "HH:mm")));
  console.log(timetable);

  const initialSchedule = days.reduce((acc, day) => {
    acc[day] = timeOptions.reduce((slotAcc, time) => {
      slotAcc[time] = ""; // empty cell
      return slotAcc;
    }, {});
    return acc;
  }, {});

  const getEntryLabel = (course) => {
    if (!course) return "";
    return course.courseCode === "BREAK" ? course.courseName : course.courseCode;
  };

  timetable.forEach(({ day, startTime, course }) => {
    //console.log( day, startTime, course );
    if (initialSchedule[day] && initialSchedule[day][startTime] !== undefined) {
      initialSchedule[day][startTime] = getEntryLabel(course);
      //console.log("Inside for Each");
    }
  });
  //console.log(initialSchedule);

  const getCourseCode = (day, time) => {
    const slot = timetable.find(
      (t) => t.day === day && t.startTime === time
    );
    return slot ? getEntryLabel(slot.course) : "";
  };

  const getEntry = (day, time) => {
    return timetable.find(
      (t) => t.day === day && t.startTime === time
    );
  };

  const getDurationLabel = (entry) => {
    if (!entry) return "";

    const start = dayjs(entry.startTime, "HH:mm");
    const end = dayjs(entry.endTime, "HH:mm");
    const totalMinutes = end.diff(start, "minute");
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    return `${minutes}m`;
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
  const [savedTimetable, setSavedTimetable] = useState(initialSavedTimetable || null);
  const [scheduleName, setScheduleName] = useState(savedTimetable?.name || "");
  const [className, setClassName] = useState(savedTimetable?.className || "");
  const [section, setSection] = useState(savedTimetable?.section || "");
  const [description, setDescription] = useState(savedTimetable?.description || "");

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleModalOk = async () => {
    if (!scheduleName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (!className.trim()) {
      toast.error("Class cannot be empty");
      return;
    }

    if (!section.trim()) {
      toast.error("Section cannot be empty");
      return;
    }

    const payload = {
      name: scheduleName.trim(),
      className: className.trim(),
      section: section.trim(),
      description: description.trim(),
      timetable : timetable,
      degree : localStorage.getItem("Degree") || savedTimetable?.degree,
      branch : localStorage.getItem("Branch") || savedTimetable?.branch
    };

    try {
      if (savedTimetable?._id) {
        const response = await axios.put(`http://localhost:3000/timetables/${savedTimetable._id}`, payload);
        setSavedTimetable(response.data);
        toast.success("Timetable updated successfully");
      } else {
        const response = await axios.post("http://localhost:3000/timetables", payload);
        setSavedTimetable(response.data);
        toast.success("Timetable saved successfully");
      }

      setShowModal(false);
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

      {savedTimetable && (
        <div className="timetable-details">
          <h1>{savedTimetable.name}</h1>
          <p>
            Class: {savedTimetable.className || "N/A"} | Section: {savedTimetable.section || "N/A"}
          </p>
          {savedTimetable.description && <p>{savedTimetable.description}</p>}
        </div>
      )}
  
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
                const entry = getEntry(day, time);
                const cell = schedule[day]?.[time] || "";
                const course = getCourseCode(day, time);//typeof cell === "string" ? cell : cell.code;
                const isBreak = entry?.course?.courseCode === "BREAK";
                const color = typeof cell === "object" ? cell.color : colors[course];
                const style = {
                  backgroundColor: color || undefined,
                  cursor: course ? 'pointer' : 'default'
                };

                return (
                  <td
                    key={time}
                    style={style}
                    className={entry ? `scheduled-cell ${isBreak ? "break-cell" : "course-cell"}` : ""}
                    onDoubleClick={() => handleDoubleClick(cell, day, time)}
                  >
                    {entry && (
                      <div className="schedule-entry">
                        <span className="entry-title">{initialSchedule[day][time]}</span>
                        <span className="entry-time">{entry.startTime} - {entry.endTime}</span>
                        <span className="entry-duration">{getDurationLabel(entry)}</span>
                      </div>
                    )}
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
      {!isViewMode && (
        <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2 rounded" style={{marginTop : 50}}>
          {savedTimetable?._id ? "Save Changes" : "Save"}
        </button>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{savedTimetable?._id ? "Update Timetable" : "Save Timetable"}</h2>
            <input
              type="text"
              placeholder="Timetable name"
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="modal-buttons">
              <button onClick={handleModalOk}>{savedTimetable?._id ? "Update" : "Save"}</button>
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TimeTableSchedule;
