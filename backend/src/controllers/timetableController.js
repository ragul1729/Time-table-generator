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
  } catch (error) {
    console.error("Error saving timetable:", error);
    res.status(500).json({ error: "Failed to save timetable" });
  }
};

module.exports = {
  saveTimetable,
};