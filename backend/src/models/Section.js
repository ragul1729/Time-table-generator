const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
    degree: String,
    Branch: String,
    Duration : Number
});

module.exports = mongoose.model("Section", sectionSchema);