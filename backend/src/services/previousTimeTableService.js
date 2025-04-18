const PreviousTimeTable = require("../models/PreviousTimeTable");

const getAllPreviousTimeTables= async () => {
    return await PreviousTimeTable.find();
}

const getPreviousTimeTable = async () => {
    return await PreviousTimeTable.findById();
}

const createPreviousTimeTable = async (data) => {
    return await PreviousTimeTable.create(data);
}

const updatePreviousTimeTable = async (id, data) => {
    return await PreviousTimeTable.findByIdAndUpdate(id, data);
}

const deletePreviousTimeTable = async (id) => {
    return await PreviousTimeTable.findByIdAndDelete(id);
}

module.exports = {getAllPreviousTimeTables, getPreviousTimeTable, createPreviousTimeTable, updatePreviousTimeTable, deletePreviousTimeTable};