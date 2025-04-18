const mongoose = require('mongoose');

const lectureslotSchema = new mongoose.Schema({
    courseCode : String,
    numOfSlots : Number,
    startTime: Date,
    Day : String
})

module.exports = mongoose.model("LectureSlot", lectureslotSchema);