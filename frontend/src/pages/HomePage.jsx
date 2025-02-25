import React from "react";
import { Button } from "@mui/material";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen px-10">
      {/* Image on the Left */}
      <div className="flex-1 flex justify-center">
        <img
          src=".\src\assets\login_pic.jpg"
          height={150}
          width={150}
          alt="Time Table Illustration"
          className="w-80"
        />
      </div>

      {/* Content on the Right */}
      <div className="flex-1 flex flex-col items-center">
        <h1 className="text-3xl font-semibold mb-6 text-gray-700">
          Time Table Generator
        </h1>

        <Button className="w-48 p-3 mb-4 bg-black text-white rounded">
          Create new Time Table
        </Button>
        <Button className="w-48 p-3 bg-black text-white rounded">
          View previous Time Tables
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
