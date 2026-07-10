const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  day: String,
  course: {
    courseCode: String,
    courseName: String,
    instructorName: String
  },
  startTime: String,
  endTime: String
});

const timetableSchema = new mongoose.Schema({
  name : String,
  entries: [timeSlotSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  degree : String, 
  branch : String
});

module.exports = mongoose.model("TimeTable", timetableSchema);
