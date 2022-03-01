import mongoose from "mongoose";

const StudentGradeSchema = new mongoose.Schema({
    MIS: {
        type: Number,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    }
});

StudentGradeSchema.index({
    MIS: 1,
    courseCode: 1
}, { unique: true });

export default mongoose.models.StudentGrade || mongoose.model("StudentGrade", StudentGradeSchema);