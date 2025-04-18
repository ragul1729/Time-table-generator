const sectionService = require("../services/sectionService");

const getAllSections = async (req, res) => {
    const sections = await sectionService.getAllSections();
    return sections;
};

const getSection = async (req, res) => {
    const section = await sectionService.getSection(req.params.id);
    return section;
};

const createSection = async (req, res) => {
    const newSection = await sectionService.createSection(req.body);
    res.status(201).json(newSection);
};

const updateSection = async (req, res) => {
    const updatedLectureSlot = await sectionService.updateSection(req.params.id, req.body);
    updatedCourse ? res.json(updatedLectureSlot) : res.status(404).send('Section not found');
};

const deleteSection = async (req,res) => {
    const deletedLectureSlot = await sectionService.deleteSection(req.params.id);
    deletedLectureSlot ? res.json({message : "Deleted"}) : res.status(404).send('Section not found');
};

module.exports = {getAllSections, getSection, createSection, updateSection, deleteSection};