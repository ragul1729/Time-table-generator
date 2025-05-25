import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DegreeBranchSelection.css";
import Sidebar from "../components/Sidebar";
const DegreeBranchSelection = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [programmes, setProgrammes] = useState([]);
  const [branchesForSelectedDegree, setBranchesForSelectedDegree] = useState([]);

  useEffect(() => {
    const fetchProgrammes = async() => {
      try{
        const { data } = await axios.get("http://localhost:3000/programmes");
        console.log(data["degreesAndBranches"]);
        //setDegrees(data["degrees"].flatMap(degree => degree[0]));
        //console.log(degrees);
        //const branches = data["degreesAndBranches"].flatMap(degree => degree.branches);
        //setBranches(branches);
        //console.log(branches);
        setProgrammes(data["degreesAndBranches"]);
        console.log(programmes);
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

  // const handleSelect = (dropdown, value) => {
  //   if (dropdown === "degree") {
  //     setSelectedDegree(value);
  //   } else if (dropdown === "branch") {
  //     setSelectedBranch(value);
  //   }
  //   setOpenDropdown(null); 
  // };

  const handleDegreeChange = (e) => {
    const selected = e.target.value
    setSelectedDegree(selected);
    const degreeObj = programmes.find(p => p.name[0] === selected);
    if (degreeObj) {
      setBranchesForSelectedDegree(degreeObj.branches);
    } else {
      setBranchesForSelectedDegree([]);
    }
    console.log(degreeObj);
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
          <select className="dropdown-content" value={selectedDegree} onChange={handleDegreeChange} required>
              <option value="" disabled hidden>
                -- Select a degree --
              </option>
            {
              programmes.map((prog, idx) => <option key={idx} value={prog.name}>{prog.name}</option>)
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
          <select className="dropdown-content" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} required>
            <option value="" disabled hidden>
              -- Select a branch --
            </option>
            {
              branchesForSelectedDegree.map((branch, idx) => <option key={idx} value={branch}>{branch}</option>)
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
