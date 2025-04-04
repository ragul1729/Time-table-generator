import React, { useState } from "react";
import './index.css';
import './AddCourse.css';
import Sidebar from "../components/Sidebar";

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    lecturesPerWeek: "",
    duration: "",
    instructorName: "",
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Added:", course);
    // Add API call or state update logic here
  };

  return (
    <div className="add-course" >
      <Sidebar />
      <div className="container">
          <h1>ADD COURSE</h1>
          <form>
              <div>
                  <label>Course name</label>
                  <div className="input-group">
                      <input type="text" placeholder="Name of the course" />
                  </div>
              </div>
              <div className="grid grid-2">
                  <div>
                      <label>No. of Lectures</label>
                      <div className="input-group">
                          <input type="text" placeholder="No. of Lectures" />
                      </div>
                  </div>
                  <div>
                      <label>Duration</label>
                      <div className="input-group">
                          <input type="text" placeholder="Duration of a class" />
                      </div>
                  </div>
              </div>
              <div>
                  <label>Name of instructor</label>
                  <div className="input-group">
                      <input type="text" placeholder="Name of the instructor" />
                  </div>
              </div>
              <div className="button-container">
                  <button type="submit">Add Course</button>
              </div>
          </form>
      </div>
    </div>
  );
};

export default AddCourse;
