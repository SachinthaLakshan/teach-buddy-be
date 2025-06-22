const TeachingRecord = require('../models/TeachingRecord');
const Subject = require('../models/Subject');

exports.getRecordsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const records = await TeachingRecord.find({ userId }).sort({ date: -1, period: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.addTeachingRecord = async (req, res) => {
  try {
    const { userId, date, period, subjectId, description } = req.body;
    if (!userId || !date || !period || !subjectId || !description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const subject = await Subject.findById(subjectId);
    const subjectName = subject ? subject.name : 'Unknown Subject';
    const record = new TeachingRecord({ userId, date, period, subjectId, subjectName, description });
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.updateTeachingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, period, subjectId, description } = req.body;

    const updateFields = {};
    if (date) updateFields.date = date;
    if (period) updateFields.period = period;
    if (description) updateFields.description = description;

    if (subjectId) {
      const subject = await Subject.findById(subjectId);
      if (subject) {
        updateFields.subjectId = subjectId;
        updateFields.subjectName = subject.name;
      } else {
        return res.status(400).json({ message: 'Invalid subject ID provided.' });
      }
    }

    const record = await TeachingRecord.findByIdAndUpdate(id, updateFields, { new: true });

    if (!record) {
      return res.status(404).json({ message: 'Teaching record not found.' });
    }

    res.json(record);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteTeachingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await TeachingRecord.findByIdAndDelete(id);
    if (!record) return res.status(404).json({ message: 'Teaching record not found.' });
    res.json({ message: 'Teaching record deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 