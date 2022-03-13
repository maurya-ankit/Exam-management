import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';
import StudentGrade from '../../../../models/studentGrade';

import nc from "next-connect";

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

});
handler.patch(async (req, res) => {
    // get list of students with marks and grade from body
    const { slug } = req.query;
    const courseCode = slug[0];
    const { students } = req.body;
    students.forEach(async (student) => {
        const a = await StudentGrade.findOneAndUpdate({
            MIS: student.MIS,
            courseCode
        }, {
            $set: {
                marks: parseInt(student.marks),
                grade: student.grade
            }
        })
        console.log({
            a
        })
    });
    res.status(200).json({ success: true, message: 'Successfully updated' })
});

handler.delete(async (req, res) => {
});

export default handler;