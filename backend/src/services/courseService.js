const Course = require('../models/Course');

const getAllCourses = async () => {
    try{
        const courses = await Course.find();
        return courses;
    } catch(err){
        console.log("Error while fetching course : ", err);
        throw err;
    }
}

const getCourse = async () => {
    return await Course.findById();
}

const createCourse = async (data) => {
    try {
        console.log("Inside course service: ", data);
        const newCourse = await Course.create(data);
        return newCourse;
    } catch(err) {
        console.log("Error while creating course : ", err);
        throw err;
    }
}

const updateCourse = async (id, data) => {
    return await Course.findByIdAndUpdate(id, data);
}

const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
}

module.exports = {getAllCourses, getCourse, createCourse, updateCourse, deleteCourse};