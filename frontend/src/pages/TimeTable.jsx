import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = ["8:30-9:20", "9:30-10:20", "10:30-11:20", "11:30-12:20", "1:30-2:20", "2:30-3:20", "3:30-4:20"];

const colors = ["bg-yellow-300", "bg-blue-300", "bg-red-300", "bg-green-300", "bg-purple-300", "bg-pink-300"];

const Timetable = () => {
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
    <div className="flex flex-col items-center mt-10">
      <div id="schedule-table" className="overflow-x-auto border rounded-lg shadow-lg p-4 bg-white">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 bg-gray-200">Time</th>
              {periods.map((period, index) => (
                <th key={index} className="border px-4 py-2 bg-gray-200">{period}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day, dayIndex) => (
              <tr key={dayIndex}>
                <td className="border px-4 py-2 bg-gray-100 font-bold">{day}</td>
                {table[dayIndex].map((cell, periodIndex) => (
                  <td
                    key={periodIndex}
                    className={`border px-6 py-4 cursor-pointer transition ${cell.color}`}
                    onClick={() => handleCellClick(dayIndex, periodIndex)}
                  >
                    {cell.course || "ADL"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={downloadPDF}
        className="mt-6 px-6 py-2 bg-black text-white text-lg rounded-md hover:bg-gray-800"
      >
        Download as PDF
      </button>
    </div>
  );
};

export default Timetable;
