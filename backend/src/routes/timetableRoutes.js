const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.post("/", timetableController.saveTimetable);
router.get('/', timetableController.getAllTimeTables);


module.exports = router;
