const programmeService = require("../services/programmeService");

const getAllProgrammes = async(req, res) => {
    const programmes = await programmeService.getAllProgrammes();
    //console.log("Inside programme controller");
    //console.log(programmes);
    res.status(200).json(programmes);
};

module.exports = { getAllProgrammes };