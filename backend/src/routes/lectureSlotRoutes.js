const router = require("express").Router();

const lectureSlotController = require("../controllers/lectureSlotController");

router.get('/', lectureSlotController.getAllLectureSlots);
router.get('/:id', lectureSlotController.getLectureSlot);
router.post('/', lectureSlotController.createLectureSlot);
router.put('/:id', lectureSlotController.updateLectureSlot);
router.delete('/:id', lectureSlotController.deleteLectureSlot);

module.exports = router;