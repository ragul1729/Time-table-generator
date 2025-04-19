import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DegreeBranchSelection.css";
import Sidebar from "../components/Sidebar";
const DegreeBranchSelection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [degrees, setDegrees] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchProgrammes = async() => {
      try{
        const { data } = await axios.get("http://localhost:3000/programmes");
        console.log(data);
        setDegrees(data["degrees"].flatMap(degree => degree[0]));
        console.log(degrees);
        const branches = data["degreesAndBranches"].flatMap(degree => degree.branches);
        setBranches(branches);
        console.log(branches);
      }
      catch(error){
        console.log("error while fetching Programmesdata", error);
      }
    }
    fetchProgrammes();
  }, [])

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
            {
              degrees.map(degree => <option key={degree}>{degree}</option>)
            }
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
            {
              branches.map(branch => <option key={branch}>{branch}</option>)
            }
          </select> 
        )}
      </div>

      <div>
        <label>Duration (in min)</label>
        <div className="input-group">
            <input type="text" placeholder="Duration" value={50} disabled/>
        </div>
      </div>

      {/* <div className="action-group">
          <button>Add Course</button>
      </div> */}
    </div>
  );
};

export default DegreeBranchSelection;
