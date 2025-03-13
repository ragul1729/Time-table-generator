import React from "react";
import { Button } from "@mui/material";
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="container">
        <h1 className="title">Time Table Generator</h1>
        <div className="image">
            <img src="https://storage.googleapis.com/a1aa/image/R0DWCkCm82jhjNCz-QB6IPfa44-pn7fnXaUiNhD-yr4.jpg" alt="Illustration of a person planning a timetable with a calendar, books, and a clock" width="300" height="300" />
        </div>
        <div className="buttons">
            <button className="button">Create new Time Table</button>
            <button className="button">View previous Time Tables</button>
        </div>
    </div>
  );
};

export default HomePage;
