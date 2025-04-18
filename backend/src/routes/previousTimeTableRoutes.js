const router = require("express").Router();

const previousTimeTableController = require("../controllers/previousTimeTableController");

router.get('/', previousTimeTableController.getAllPreviousTimeTables);
router.get('/:id', previousTimeTableController.getPreviousTimeTable);
router.post('/', previousTimeTableController.createPreviousTimeTable);
router.put('/:id', previousTimeTableController.updatePreviousTimeTable);
router.delete('/:id', previousTimeTableController.deletePreviousTimeTable);

module.exports = router;