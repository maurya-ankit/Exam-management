import dbConnect from '../../../../lib/dbConnect';
import StudentGrade from '../../../../models/studentGrade';


import nc from "next-connect";
import GradeRange from '../../../../models/gradeRange';
import Students from '../../../../models/students';

const handler = nc({
    onError: (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res) => {
        res.status(404).end("Page is not found");
    },
})

handler.use(async (req, res, next) => {
    await dbConnect();
    next();
})

handler.get(async (req, res) => {
    const { academicYear, semester, courseCode } = req.query;
    const gradeRange = await GradeRange.findOne({ academicYear, semester, courseCode }, {
        students: 1
    });
    if (!gradeRange) {
        res.status(404).end("Page is not found");
    }
    const studentGrade = await StudentGrade.find(
        // multi-match
        {
            $or: [
                {
                    courseCode,
                },
                {
                    MIS: {
                        $in: gradeRange.students
                    }
                }
            ]
        }
    );
    res.status(200).json(studentGrade);
});
handler.post(async (req, res) => {
    try {
        const { MIS, courseCode, marks, grade, academicYear, semester } = req.body;
        console.log(req.body);
        const studentGrade = await StudentGrade.create({
            MIS,
            courseCode,
            marks,
            grade
        });
        const gradeRange = await GradeRange.findOneAndUpdate({
            academicYear, semester, courseCode
        }, {
            // push MIS to students array as set
            $addToSet: {
                students: MIS
            }
        })
        const student = await Students.updateOne({
            MIS, 'semesters.semester': semester, 'semesters.academicYear': academicYear
        }, {
            $addToSet: {
                'semesters.$.course': studentGrade._id.toString()
            }
        });
        console.log(student);
        if (!student.modifiedCount) {
            // first create semester and add course
            const student = await Students.findOneAndUpdate({
                MIS
            }, {
                $push: {
                    semesters: {
                        semester,
                        academicYear,
                        course: [studentGrade._id.toString()]
                    }
                }
            })
        }
        res.status(201).json({ success: true, data: studentGrade })
    }
    catch (err) {
        res.status(400).json({ success: false, error: err })
    }
})

export default handler;