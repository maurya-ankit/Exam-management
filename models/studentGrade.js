import mongoose from "mongoose";
import { string } from "sharp/lib/is";

const StudentGradeSchema = new mongoose.Schema({
    MIS: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
    },
    grade: {
        type: String,
    }
});

StudentGradeSchema.index({
    MIS: 1,
    courseCode: 1
}, { unique: true });

export default mongoose.models.StudentGrade || mongoose.model("StudentGrade", StudentGradeSchema);