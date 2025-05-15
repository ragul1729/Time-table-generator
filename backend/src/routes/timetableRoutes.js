const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

router.post("/", timetableController.saveTimetable);

module.exports = router;
