import React, { useState } from "react";
import "./DegreeBranchSelection.css";
import Sidebar from "../components/Sidebar";
const DegreeBranchSelection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleSelect = (dropdown, value) => {
    if (dropdown === "degree") {
      setSelectedDegree(value);
    } else if (dropdown === "branch") {
      setSelectedBranch(value);
    }
    setOpenDropdown(null); // Close dropdown after selection
  };

  return (
    <div className="container">
      {/* Select Degree Dropdown */}
      <Sidebar />
      <div className="dropdown">
        <div className="dropdown-label" onClick={() => toggleDropdown("degree")}>
          <span className="icon">⚙️</span>
          Select degree
        </div>
        {openDropdown === "degree" && (
          <select className="dropdown-content" required>
            <option>B.E</option>
            <option>M.E</option>
            <option>MCA</option>
            <option>M.Sc</option>
          </select>
        )}
      </div>

      {/* Select Branch Dropdown */}
      <div className="dropdown">
        <div className="dropdown-label" onClick={() => toggleDropdown("branch")}>
          <span className="icon">⚙️</span>
          Select branch
        </div>
        {openDropdown === "branch" && (
          <select className="dropdown-content" required>
            <option>CSE</option>
            <option>ECE</option>
            <option>EEE</option>
            <option>Mech</option>
          </select> 
        )}
      </div>

      <div>
        <label>Duration (in min)</label>
        <div className="input-group">
            <input type="text" placeholder="Duration" />
        </div>
      </div>

      <div className="action-group">
          <button>Add Course</button>
      </div>
    </div>
  );
};

export default DegreeBranchSelection;
