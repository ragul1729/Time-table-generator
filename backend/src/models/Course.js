const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName : String,
    courseCode : { type:String, required:true, unique:true },
    lecturesPerWeek : Number,
    instructorName : String
});

module.exports = mongoose.model("Course", courseSchema);