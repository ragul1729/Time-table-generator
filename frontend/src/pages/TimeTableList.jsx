import React from "react";
import Sidebar from "../components/Sidebar";

const TimeTableList = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-6">Time Table List</h1>

        {/* Table */}
        <table className="border border-gray-400 w-1/2 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">No.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Degree</th>
              <th className="border px-4 py-2">Branch</th>
              <th className="border px-4 py-2">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
                <td className="border px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeTableList;
