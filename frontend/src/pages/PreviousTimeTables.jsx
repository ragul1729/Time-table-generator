import React, { useState, useEffect } from "react";
import './PreviousTimeTables.css';
import Sidebar from '../components/Sidebar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PreviousTimeTables = () => {
  const [timetables, setTimetables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimetables();
  }, []);

  const fetchTimetables = async () => {
    try {
      const response = await axios.get("http://localhost:3000/timetables");
      setTimetables(response.data);
    } catch (err) {
      console.error("Error fetching timetables:", err);
    }
  };

  const handleView = (table) => {
    navigate("/TimeTable", {
      state: {
        timetable: table.entries,
        savedTimetable: table,
        mode: "view"
      }
    });
  };

  const handleEdit = (table) => {
    navigate("/schedule", {
      state: {
        timetable: table.entries,
        savedTimetable: table,
        mode: "edit"
      }
    });
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this timetable?");

    if (!shouldDelete) return;

    try {
      await axios.delete(`http://localhost:3000/timetables/${id}`);
      setTimetables(current => current.filter(table => table._id !== id));
    } catch (err) {
      console.error("Error deleting timetable:", err);
    }
  };

  return (
    <div className="time-table">
      <Sidebar />
      
      <div className="main-content">
          <h1>Time Table List</h1>
          <table>
              <thead>
                  <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Section</th>
                      <th>Description</th>
                      <th>Degree</th>
                      <th>Branch</th>
                      <th>Created</th>
                      <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {timetables.length === 0 && (
                    <tr>
                      <td colSpan="9">No timetables saved yet.</td>
                    </tr>
                  )}
                  {timetables.map((table, index) => (
                    <tr key={table._id}>
                      <td>{index + 1}</td>
                      <td>{table.name}</td>
                      <td>{table.className || "N/A"}</td>
                      <td>{table.section || "N/A"}</td>
                      <td>{table.description || "N/A"}</td>
                      <td>{table.degree || "N/A"}</td>
                      <td>{table.branch || "N/A"}</td>
                      <td>{new Date(table.createdAt).toLocaleString()}</td>
                      <td>
                        <div className="table-actions">
                          <button type="button" onClick={() => handleView(table)}>View</button>
                          <button type="button" onClick={() => handleEdit(table)}>Edit</button>
                          <button type="button" className="danger" onClick={() => handleDelete(table._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default PreviousTimeTables;


