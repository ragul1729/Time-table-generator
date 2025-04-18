const Section = require("../models/Section");

const getAllSections = async () => {
    return await Section.find();
}

const getSection = async () => {
    return await Section.findById();
}

const createSection = async (data) => {
    return await Section.create(data);
}

const updateSection = async (id, data) => {
    return await Section.findByIdAndUpdate(id, data);
}

const deleteSection = async (id) => {
    return await Section.findByIdAndDelete(id);
}

module.exports = {getAllSections, getSection, createSection, updateSection, deleteSection};