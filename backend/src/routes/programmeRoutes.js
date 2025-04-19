const router = require("express").Router();

const programmerController = require("../controllers/programmeController");

router.get("/", programmerController.getAllProgrammes);

module.exports = router;