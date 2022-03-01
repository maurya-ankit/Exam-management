import mongoose, { Schema } from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    MIS: {
        type: Number,
        required: true
    },
    yearOfAdmission: {
        type: Number,
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
    semester: [
        {
            sem: {
                type: Schema.Types.Number,
                required: true
            },
            academicYear: {
                type: Schema.Types.String,
                required: true
            },
            course: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "StudentGrade"
                }
            ]
        }
    ]
});

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);