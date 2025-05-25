const timetableService = require("../services/timetableService");

const saveTimetable = async (req, res) => {
  try {
    const { timetable } = req.body;
    console.log("Inside time table controller");
    console.log(timetable);
    
    if (!Array.isArray(timetable) || timetable.length === 0) {
      return res.status(400).json({ error: "Invalid or empty timetable data" });
    }

    const savedTable = await timetableService.saveTimetable(timetable);
    res.status(201).json(savedTable);
  } catch (err) {
    console.error("Error saving timetable:", err);
    res.status(500).json({ err: "Failed to save timetable" });
  }
};

const getAllTimeTables = async (req, res) => {
  try {
    const tables = await timetableService.getAllTimeTables();
    res.json(tables);
  } catch (err) {
    console.error("Error retrieving timetable:", err);
    res.status(500).json({ err: 'Failed to fetch timetables' });
  }
};

module.exports = {
  saveTimetable, getAllTimeTables
};