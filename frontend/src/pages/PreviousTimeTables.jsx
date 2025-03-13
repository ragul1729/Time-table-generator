import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './PreviousTimeTables.css';
import Sidebar from '../components/Sidebar';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["8:30-9:20", "9:30-10:20", "10:30-11:20", "11:30-12:20", "1:30-2:20", "2:30-3:20", "3:30-4:20"];

const colors = ["bg-yellow-300", "bg-blue-300", "bg-red-300", "bg-green-300", "bg-purple-300", "bg-pink-300"];

const PreviousTimeTables = () => {
  const [table, setTable] = useState(
    Array(5).fill(Array(7).fill({ course: "", color: "" }))
  );

  const handleCellClick = (dayIndex, periodIndex) => {
    const colorIndex = Math.floor(Math.random() * colors.length);
    const newColor = colors[colorIndex];

    const updatedTable = table.map((row, rIndex) =>
      rIndex === dayIndex
        ? row.map((cell, cIndex) =>
            cIndex === periodIndex ? { ...cell, color: newColor } : cell
          )
        : row
    );

    setTable(updatedTable);
  };

  const downloadPDF = () => {
    const input = document.getElementById("schedule-table");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("schedule.pdf");
    });
  };

  return (
    <div className="time-table">
      {/* <div className="sidebar">
          <button>HOME</button>
          <button>DEGREE</button>
          <button>COURSE</button>
          <button>SCHEDULE</button>
          <button>VIEW</button>
      </div> */}
      <Sidebar />
      
      <div className="main-content">
          <h1>Time Table List</h1>
          <table>
              <thead>
                  <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Degree</th>
                      <th>Branch</th>
                      <th>Last Updated</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
                  <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
  );
};

export default PreviousTimeTables;


