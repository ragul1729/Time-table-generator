import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import './index.css';
import './AddCourse.css';
import Sidebar from "../components/Sidebar";

const AddCourse = () => {
  /*const [course, setCourse] = useState({
    courseName: "",
    lecturesPerWeek: "",
    duration: "",
    instructorName: "",
  });*/

  const {register, handleSubmit, formState: {errors}} = useForm();

  /*const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };*/

  const onSubmitForm = async (courseData) => {
    //e.preventDefault();
    try{
      console.log("Course Added:", courseData);
      const response = axios.post("http://localhost:3000/courses", courseData);
      console.log(response.data);
    }
    catch(error){
      console.log("Post failed for adding course : ", error);
    }
     //Add API call or state update logic here
  };

  return (
    <div className="add-course" >
      <Sidebar />
      <div className="container">
          <h1>ADD COURSE</h1>
          <form onSubmit={handleSubmit(onSubmitForm)}>
              <div>
                  <label>Course name</label>
                  <div className="input-group">
                      <input {...register("courseName", {required:true})} type="text" placeholder="Name of the course" />
                      {errors.courseName && <span>Course Name is required</span>}
                  </div>
              </div>
              <div className="grid grid-2">
                  <div>
                      <label>No. of Lectures</label>
                      <div className="input-group">
                          <input {...register("lecturesPerWeek", {required:true})} type="text" placeholder="No. of Lectures" />
                          {errors.lecturesPerWeek && <span>Number of Lectures is required</span>}
                      </div>
                  </div>
                  <div>
                      <label>Course Code</label>
                      <div className="input-group">
                          <input {...register("courseCode", {required:true})} type="text" placeholder="Course Code" />
                          {errors.courseCode && <span>Course Code is required</span>}
                      </div>
                  </div>
              </div>
              <div>
                  <label>Name of instructor</label>
                  <div className="input-group">
                      <input {...register("instructorName", {required:true})} type="text" placeholder="Name of the instructor" />
                      {errors.instructorName && <span>Instructor Name is required</span>}
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
