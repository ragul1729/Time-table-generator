import React, { useState } from "react";
import './index.css'


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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">ADD COURSE</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Course name</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter course name"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">No. of Lectures per week</label>
            <input
              type="number"
              name="lecturesPerWeek"
              value={course.lecturesPerWeek}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter number"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Duration</label>
            <input
              type="text"
              name="duration"
              value={course.duration}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Enter duration"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-semibold mb-1">Name of Instructor</label>
          <input
            type="text"
            name="instructorName"
            value={course.instructorName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter instructor name"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-black text-white py-2 rounded-md text-lg font-semibold hover:bg-gray-800"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
