const router = require("express").Router();

const sectionController = require("../controllers/sectionController");

router.get('/', sectionController.getAllSections);
router.get('/:id', sectionController.getSection);
router.post('/', sectionController.createSection);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

module.exports = router;