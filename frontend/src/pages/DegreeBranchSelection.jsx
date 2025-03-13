import React, { useState } from "react";
import './DegreeBranchSelection.css';
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

const DegreeBranchSelection = () => {
  return (
    <div className="degree-branch">
      <div className="button-group">
          <button>Monday</button>
          <button>Tuesday</button>
          <button>Wednesday</button>
          <button>Thursday</button>
          <button className="active">Friday</button>
      </div>
      <div className="dropdown">
          <button>
              <i className="fas fa-cog"></i>
              <span>Select Course</span>
          </button>
          <div className="dropdown-content">
              <button>Course 1</button>
              <button>Course 2</button>
              <button>Course 3</button>
              <button>ADD BREAK</button>
          </div>
      </div>
      <div className="input-group">
          <div>
              <label htmlFor="hours">No. of hours</label>
              <input type="text" id="hours" value="2" />
          </div>
          <div>
              <label htmlFor="break">Break</label>
              <input type="text" id="break" value="Lunch" />
          </div>
      </div>
      <div className="time-group">
          <div>
              <h2>Start time</h2>
              <div className="time-box">
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
              </div>
          </div>
          <div>
              <h2>End time</h2>
              <div className="time-box">
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
              </div>
          </div>
      </div>
      <div className="action-group">
          <button>Add</button>
          <button>Generate Timetable</button>
      </div>
    </div>
  );
};

export default DegreeBranchSelection;
