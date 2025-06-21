const express = require('express');
const router = express.Router();
const teachingRecordController = require('../controllers/teachingRecordController');

router.get('/user/:userId', teachingRecordController.getRecordsForUser);
router.post('/', teachingRecordController.addTeachingRecord);
router.delete('/:id', teachingRecordController.deleteTeachingRecord);

module.exports = router; 