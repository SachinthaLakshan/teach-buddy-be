const express = require('express');
const router = express.Router();
const lessonPlanController = require('../controllers/lessonPlanController');

router.get('/user/:userId', lessonPlanController.getLessonPlansForUser);
router.post('/', lessonPlanController.addLessonPlan);
router.delete('/:id', lessonPlanController.deleteLessonPlan);

module.exports = router; 