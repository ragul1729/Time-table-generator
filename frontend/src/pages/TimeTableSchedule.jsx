import React, { useState } from 'react';
import './TimeTableSchedule.css';
import Sidebar from "../components/Sidebar";

const timeSlots = [
  "08:30", "09:20", "10:10", "11:00", "11:50",
  "12:10", // Lunch start
  "13:40", "14:30", "15:20", "16:10"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const initialSchedule = {
  Monday:    { "08:30": "CS101", "09:20": "MA101", "10:10": "", "11:00": "PH101", "11:50": "", "13:40": "CS101" },
  Tuesday:   { "08:30": "", "09:20": "PH101", "10:10": "CS101", "11:00": "", "11:50": "MA101", "13:40": "" },
  Wednesday: { "08:30": "MA101", "09:20": "", "10:10": "CS101", "11:00": "PH101", "11:50": "", "13:40": "" },
  Thursday:  { "08:30": "", "09:20": "CS101", "10:10": "", "11:00": "MA101", "11:50": "PH101", "13:40": "" },
  Friday:    { "08:30": "PH101", "09:20": "", "10:10": "MA101", "11:00": "", "11:50": "CS101", "13:40": "" }
};

const availableColors = [
  'red', 'green', 'blue', 'yellow', 'orange', 'pink', 'purple', 'cyan'
];

const TimeTableSchedule = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [colors, setColors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [colorOptions, setColorOptions] = useState(availableColors);

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

  return (
    <div className="schedule-container">
      <Sidebar />
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Day / Time</th>
            {timeSlots.map(time => (
              <th key={time}>{time === "12:10" ? "Lunch Break" : time}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map(day => (
            <tr key={day}>
              <th>{day}</th>
              {timeSlots.map(time => {
                const cell = schedule[day]?.[time] || "";
                const course = typeof cell === "string" ? cell : cell.code;
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
                    {course}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

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
