const previousTimeTableService = require("../services/previousTimeTableService");

const getAllPreviousTimeTables = async (req, res) => {
    const previousTimeTables = await previousTimeTableService.getAllPreviousTimeTables();
    return previousTimeTables;
};

const getPreviousTimeTable = async (req, res) => {
    const previousTimeTable = await previousTimeTableService.getPreviousTimeTable(req.params.id);
    return previousTimeTable;
};

const createPreviousTimeTable = async (req, res) => {
    const newPreviousTimeTable = await previousTimeTableService.createPreviousTimeTable(req.body);
    res.status(201).json(newPreviousTimeTable);
};

const updatePreviousTimeTable = async (req, res) => {
    const updatedPreviousTimeTable = await previousTimeTableService.updatePreviousTimeTable(req.params.id, req.body);
    updatedPreviousTimeTable ? res.json(updatedPreviousTimeTable) : res.status(404).send('Time table not found');
};

const deletePreviousTimeTable = async (req,res) => {
    const deletedPreviousTimeTable = await previousTimeTableService.deletePreviousTimeTable(req.params.id);
    deletedPreviousTimeTable? res.json({message : "Deleted"}) : res.status(404).send('Time table not found');
};

module.exports = {getAllPreviousTimeTables, getPreviousTimeTable, createPreviousTimeTable, updatePreviousTimeTable, deletePreviousTimeTable};