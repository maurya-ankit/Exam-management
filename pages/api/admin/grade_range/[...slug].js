import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';

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

handler.use((req, res, next) => {
    const { slug } = req.query;
    if (slug.length < 3) {
        res.status(400).json({ success: false, message: 'Invalid slug' })
        return;
    }
    next();
})

handler.get(async (req, res) => {
    const { slug } = req.query;
    const [academicYear, semester, courseCode] = slug;
    let gradeRange = await GradeRange.aggregate([
        {
            '$match': {
                'academicYear': academicYear,
                'semester': semester,
                'courseCode': courseCode
            }
        }, {
            '$lookup': {
                'from': 'students',
                'localField': 'students',
                'foreignField': 'MIS',
                'as': 'students'
            }
        }, {
            '$project': {
                'students.name': 1,
                'students.MIS': 1,
                'ranges': 1
            }
        }
    ]).exec();
    if (gradeRange.length === 0) {
        return res.status(404).json({
            success: false,
            error: 'Grade range not found'
        })
    }
    gradeRange = gradeRange[0];
    res.status(200).json(gradeRange);
});
handler.patch(async (req, res) => {
    const { slug } = req.query;
    const [academicYear, semester, courseCode] = slug;
    try {
        let body = { ...req.body };
        if (body.academicYear)
            delete body.academicYear;
        if (body.semester)
            delete body.semester;
        if (body.courseCode)
            delete body.courseCode;
        if (body.students) {
            let students = new Set(body.students);
            body.students = [...students];
        }
        const gradeRange = await GradeRange.findOneAndUpdate({
            academicYear, semester, courseCode
        }, body, { new: true });
        res.status(201).json({ success: true, data: gradeRange })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
});

handler.delete(async (req, res) => {
    const { slug } = req.query;
    const [academicYear, semester, courseCode] = slug;
    try {
        const gradeRange = await GradeRange.findOneAndDelete({
            academicYear, semester, courseCode
        });
        res.status(201).json({ success: true, data: gradeRange })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
});

export default handler;