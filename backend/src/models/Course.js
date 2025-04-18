const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName : String,
    courseCode : String,
    numOfLectures : Number,
    instructorName : String
});

module.exports = mongoose.model("Course", courseSchema);