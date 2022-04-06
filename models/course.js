import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
    unique: true
  },
  courseName: {
    type: String,
    required: true
  },
  courseCredit: {
    type: Number,
    required: true
  }
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
