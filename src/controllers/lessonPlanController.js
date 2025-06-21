const LessonPlan = require('../models/LessonPlan');
const Subject = require('../models/Subject');

exports.getLessonPlansForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const plans = await LessonPlan.find({ userId }).sort({ date: -1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addLessonPlan = async (req, res) => {
  try {
    const { userId, title, subjectId, date, objectives, activities, assessment, notes } = req.body;
    if (!userId || !title || !subjectId || !date || !objectives || !activities || !assessment) {
      return res.status(400).json({ message: 'All fields except notes are required.' });
    }
    const subject = await Subject.findById(subjectId);
    const subjectName = subject ? subject.name : 'Unknown Subject';
    const plan = new LessonPlan({ userId, title, subjectId, subjectName, date, objectives, activities, assessment, notes });
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteLessonPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await LessonPlan.findByIdAndDelete(id);
    if (!plan) return res.status(404).json({ message: 'Lesson plan not found.' });
    res.json({ message: 'Lesson plan deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 