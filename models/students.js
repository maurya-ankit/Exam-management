import mongoose, { Schema } from 'mongoose';

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  MIS: {
    type: String,
    required: true,
    unique: true
  },
  yearOfAdmission: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  semesters: [
    {
      semester: {
        type: String,
        required: true
      },
      academicYear: {
        type: String,
        required: true
      },
      course: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
});

export default mongoose.models.Student ||
  mongoose.model('Student', StudentSchema);
