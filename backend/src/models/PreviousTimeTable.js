const mongoose = require('mongoose');

const PreviousTimeTableSchema = new mongoose.Schema({
    name : String,
    degree : String,
    branch : String,
    lastUpdated : Date
})

module.exports = mongoose.model("PreviousTimeTable", timeTableSchema);