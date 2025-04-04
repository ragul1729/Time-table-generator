import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './HomePage.css'

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
        <h1 className="title">Time Table Generator</h1>
        <div className="image">
            <img src="https://cdn.pixabay.com/photo/2022/04/22/01/01/calendar-7148602_1280.png" alt="Illustration of a person planning a timetable with a calendar, books, and a clock" width="300" height="300" />
        </div>
        <div className="buttons">
            <button className="button" onClick={ () => {navigate("/degreebranch")} }>Create new Time Table</button>
            <button className="button" onClick={ () => {navigate("/previoustimetables")} }>View previous Time Tables</button>
        </div>
    </div>
  );
};

export default HomePage;
