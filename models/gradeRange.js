import mongoose from 'mongoose';

const gradeRangeSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  courseCode: {
    type: String,
    required: true
  },
  ranges: [
    {
      grade: {
        type: String,
        required: true
      },
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    }
  ],
  students: [
    {
      type: String,
      required: true
    }
  ]
});

gradeRangeSchema.index(
  {
    academicYear: 1,
    semester: 1,
    courseCode: 1
  },
  { unique: true }
);

export default mongoose.models.GradeRange ||
  mongoose.model('GradeRange', gradeRangeSchema);
