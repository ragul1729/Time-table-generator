const courseService = require("../services/courseService");

const getAllCourses = (req, res) => {
    const courses = courseService.getAllCourses();
    return courses;
};

const getCourse = (req, res) => {
    const course = courseService.getCourse(req.params.id);
    return course;
};

const createCourse = async (req, res) => {
    const courseData = req.body;
    console.log("Course data received in backend: " ,courseData);
    const newCourse = await courseService.createCourse(courseData);
    console.log(newCourse);
    return res.status(201).json(newCourse);
};

const updateCourse = async (req, res) => {
    const updatedCourse = await courseService.updateCourse(req.params.id, req.body);
    updatedCourse ? res.json(updatedCourse) : res.status(404).send('Course not found');
};

const deleteCourse = async (req,res) => {
    const deletedCourse = await courseService.deleteCourse(req.params.id);
    deletedCourse ? res.json({message : "Deleted"}) : res.status(404).send('Course not found');
};

module.exports = {getAllCourses, getCourse, createCourse, updateCourse, deleteCourse};