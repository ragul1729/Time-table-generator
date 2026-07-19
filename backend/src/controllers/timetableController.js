const timetableService = require("../services/timetableService");

const saveTimetable = async (req, res) => {
  try {
    const { name, className, section, description, timetable, degree, branch } = req.body;
    console.log("Inside time table controller");
    console.log(timetable);

    if (!name || !className || !section) {
      return res.status(400).json({ error: "Name, class, and section are required" });
    }

    if (!Array.isArray(timetable) || timetable.length === 0) {
      return res.status(400).json({ error: "Invalid or empty timetable data" });
    }

    const savedTable = await timetableService.saveTimetable({
      name,
      className,
      section,
      description,
      entries: timetable,
      degree,
      branch
    });
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

const getTimeTable = async (req, res) => {
  try {
    const table = await timetableService.getTimeTable(req.params.id);

    if (!table) {
      return res.status(404).json({ error: "Timetable not found" });
    }

    res.json(table);
  } catch (err) {
    console.error("Error retrieving timetable:", err);
    res.status(500).json({ err: 'Failed to fetch timetable' });
  }
};

const updateTimeTable = async (req, res) => {
  try {
    const { name, className, section, description, timetable, degree, branch } = req.body;

    if (!name || !className || !section) {
      return res.status(400).json({ error: "Name, class, and section are required" });
    }

    if (!Array.isArray(timetable) || timetable.length === 0) {
      return res.status(400).json({ error: "Invalid or empty timetable data" });
    }

    const updatedTable = await timetableService.updateTimeTable(req.params.id, {
      name,
      className,
      section,
      description,
      entries: timetable,
      degree,
      branch
    });

    if (!updatedTable) {
      return res.status(404).json({ error: "Timetable not found" });
    }

    res.json(updatedTable);
  } catch (err) {
    console.error("Error updating timetable:", err);
    res.status(500).json({ err: "Failed to update timetable" });
  }
};

const deleteTimeTable = async (req, res) => {
  try {
    const deletedTable = await timetableService.deleteTimeTable(req.params.id);

    if (!deletedTable) {
      return res.status(404).json({ error: "Timetable not found" });
    }

    res.json({ message: "Timetable deleted successfully" });
  } catch (err) {
    console.error("Error deleting timetable:", err);
    res.status(500).json({ err: "Failed to delete timetable" });
  }
};

module.exports = {
  saveTimetable,
  getAllTimeTables,
  getTimeTable,
  updateTimeTable,
  deleteTimeTable
};
