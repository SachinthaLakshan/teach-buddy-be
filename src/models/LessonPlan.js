const mongoose = require('mongoose');

const lessonPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  subjectName: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  objectives: [{ type: String, required: true }],
  activities: [{ type: String, required: true }],
  assessment: { type: String, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('LessonPlan', lessonPlanSchema); 