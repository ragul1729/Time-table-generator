import React, { useState } from "react";

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
    <div className="flex flex-col items-center space-y-10 mt-10">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Select degree</h2>
        <DropdownMenu title="Select degree" options={["B.Eng", "M.Eng", "MCA", "M.Sc"]} />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Select branch</h2>
        <DropdownMenu title="Select branch" options={["CSE", "EEE", "ECE", "Mech"]} />
      </div>
    </div>
  );
};

export default DegreeBranchSelection;
