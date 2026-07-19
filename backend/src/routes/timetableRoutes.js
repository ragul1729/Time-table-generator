const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.post("/", timetableController.saveTimetable);
router.get('/', timetableController.getAllTimeTables);
router.get('/:id', timetableController.getTimeTable);
router.put('/:id', timetableController.updateTimeTable);
router.delete('/:id', timetableController.deleteTimeTable);


module.exports = router;
