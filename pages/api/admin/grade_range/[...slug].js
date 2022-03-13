import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';

import nc from "next-connect";
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
    const gradeRangeStu = await GradeRange.findOne({ academicYear, semester, courseCode }, {
        students: 1
    });
    const studentInfo = await Students.find({
        MIS: {
            $in: gradeRangeStu.students
        }
    }, {
        name: 1,
        MIS: 1
    });
    let gradeRange = await GradeRange.aggregate(
        [
            {
                '$match': {
                    'academicYear': academicYear,
                    'semester': semester,
                    'courseCode': courseCode
                }
            }, {
                '$lookup': {
                    'from': 'studentgrades',
                    'let': {
                        'students': '$students'
                    },
                    'pipeline': [
                        {
                            '$match': {
                                'courseCode': 'CSE-101',
                                'MIS': {
                                    '$in': gradeRangeStu.students
                                }
                            }
                        }
                    ],
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
    // append student name
    gradeRange.students = gradeRange.students.map(stu => {
        const student = studentInfo.find(stuInfo => stuInfo.MIS === stu.MIS);
        if (student) {
            stu.name = student.name;
        }
        return stu;
    })
    console.log(gradeRange);
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