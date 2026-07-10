import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    setValue
  } = useForm({ mode: "onChange" });

  /*const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };*/

  const onSubmitForm = async (courseData) => {
    //e.preventDefault();
    try{
      const response = await axios.post("http://localhost:3000/courses", courseData);
      console.log(response.data);
      toast.success("Course added successfully!");
      console.log("Course Added:", courseData);
      reset();
    }
    catch(error){
      console.log("Post failed for adding course : ", error);
      toast.error("Something went wrong!");
    }
     //Add API call or state update logic here
  };

  const onInvalidForm = (formErrors) => {
    Object.keys(formErrors).forEach((fieldName) => {
      resetField(fieldName);
    });
  };

  const handleLecturesChange = (event) => {
    const numbersOnly = event.target.value.replace(/\D/g, "");
    setValue("lecturesPerWeek", numbersOnly, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  return (
    <div className="add-course" >
      <Sidebar />
      <div className="container">
          <h1>ADD COURSE</h1>
          <form onSubmit={handleSubmit(onSubmitForm, onInvalidForm)}>
              <div>
                  <label>Course name</label>
                  <div className="input-group">
                      <input {...register("courseName", {required:true})} type="text" placeholder="Name of the course" />
                      <button type="button" className="clear-input-button" aria-label="Clear course name" onClick={() => resetField("courseName")}>
                        X
                      </button>
                      {errors.courseName && <span>Course Name is required</span>}
                  </div>
              </div>
              <div className="grid grid-2">
                  <div>
                      <label>No. of Lectures</label>
                      <div className="input-group">
                          <input
                            {...register("lecturesPerWeek", {
                              required: "Number of Lectures is required",
                              validate: (value) => {
                                const lectureCount = Number(value);
                                return (
                                  Number.isInteger(lectureCount) &&
                                  lectureCount >= 1 &&
                                  lectureCount <= 7
                                ) || "Lectures must be between 1 and 7";
                              }
                            })}
                            type="text"
                            inputMode="numeric"
                            placeholder="No. of Lectures"
                            onChange={handleLecturesChange}
                          />
                          <button type="button" className="clear-input-button" aria-label="Clear number of lectures" onClick={() => resetField("lecturesPerWeek")}>
                            X
                          </button>
                          {errors.lecturesPerWeek && <span>{errors.lecturesPerWeek.message}</span>}
                      </div>
                  </div>
                  <div>
                      <label>Course Code</label>
                      <div className="input-group">
                          <input {...register("courseCode", {required:true})} type="text" placeholder="Course Code" />
                          <button type="button" className="clear-input-button" aria-label="Clear course code" onClick={() => resetField("courseCode")}>
                            X
                          </button>
                          {errors.courseCode && <span>Course Code is required</span>}
                      </div>
                  </div>
              </div>
              <div>
                  <label>Name of instructor</label>
                  <div className="input-group">
                      <input {...register("instructorName", {required:true})} type="text" placeholder="Name of the instructor" />
                      <button type="button" className="clear-input-button" aria-label="Clear instructor name" onClick={() => resetField("instructorName")}>
                        X
                      </button>
                      {errors.instructorName && <span>Instructor Name is required</span>}
                  </div>
              </div>
              <div className="button-container">
                  <button type="submit">Add Course</button>
              </div>
          </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddCourse;
