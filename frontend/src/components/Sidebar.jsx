import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-48 h-screen bg-gray-300 flex flex-col items-center pt-10 space-y-4">
      {["Home", "Degree", "Course", "Schedule", "View"].map((item) => (
        <Button
          key={item}
          variant="contained"
          className="w-32 bg-blue-600 text-white"
          onClick={() => navigate(`/${item.toLowerCase()}`)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default Sidebar;
