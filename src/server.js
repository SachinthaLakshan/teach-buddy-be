const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const teachingRecordRoutes = require('./routes/teachingRecordRoutes');
const lessonPlanRoutes = require('./routes/lessonPlanRoutes');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teaching-records', teachingRecordRoutes);
app.use('/api/lesson-plans', lessonPlanRoutes);

app.get('/', (req, res) => {
  res.send('Teach Buddy backend server is running!');
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/teachbuddy';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Export the Express app for Vercel
module.exports = app;

// Local development server (only runs when not in Vercel environment)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}