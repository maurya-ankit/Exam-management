import mongoose from "mongoose";

const gradeRangeSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
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
            type: Number,
            required: true,
        }
    ]
});

export default mongoose.models.GradeRange || mongoose.model('GradeRange', gradeRangeSchema);