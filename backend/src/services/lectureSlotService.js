const LectureSlot = require("../models/LectureSlot");

const getAllLectureSlots = async () => {
    return await LectureSlot.find();
}

const getLectureSlot = async () => {
    return await LectureSlot.findById();
}

const createLectureSlot = async (data) => {
    return await LectureSlot.create(data);
}

const updateLectureSlot = async (id, data) => {
    return await LectureSlot.findByIdAndUpdate(id, data);
}

const deleteLectureSlot = async (id) => {
    return await LectureSlot.findByIdAndDelete(id);
}

module.exports = {getAllLectureSlots, getLectureSlot, createLectureSlot, updateLectureSlot, deleteLectureSlot};