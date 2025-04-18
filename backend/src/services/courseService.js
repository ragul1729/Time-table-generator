const Course = require('../models/Course');

const getAllCourses = async () => {
    return await Course.find();
}

const getCourse = async () => {
    return await Course.findById();
}

const createCourse = async (data) => {
    return await Course.create(data);
}

const updateCourse = async (id, data) => {
    return await Course.findByIdAndUpdate(id, data);
}

const deleteCourse = async (id) => {
    return await Course.findByIdAndDelete(id);
}

module.exports = {getAllCourses, getCourse, createCourse, updateCourse, deleteCourse};