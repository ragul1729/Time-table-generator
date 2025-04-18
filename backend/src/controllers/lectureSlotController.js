const lectureSlotService = require("../services/lectureSlotService");

const getAllLectureSlots = async (req, res) => {
    const lectureSlots = await lectureSlotService.getAllLectureSlots();
    return lectureSlots;
};

const getLectureSlot = async (req, res) => {
    const LectureSlot = await lectureSlotService.getLectureSlot(req.params.id);
    return LectureSlot;
};

const createLectureSlot = async (req, res) => {
    const newLectureSlot = await lectureSlotService.createLectureSlot(req.body);
    res.status(201).json(newLectureSlot);
};

const updateLectureSlot = async (req, res) => {
    const updatedLectureSlot = await lectureSlotService.updateLectureSlot(req.params.id, req.body);
    updatedCourse ? res.json(updatedLectureSlot) : res.status(404).send('Lecture Slot not found');
};

const deleteLectureSlot = async (req,res) => {
    const deletedLectureSlot = await lectureSlotService.deleteLectureSlot(req.params.id);
    deletedLectureSlot ? res.json({message : "Deleted"}) : res.status(404).send('Time table not found');
};

module.exports = {getAllLectureSlots, getLectureSlot, createLectureSlot, updateLectureSlot, deleteLectureSlot};