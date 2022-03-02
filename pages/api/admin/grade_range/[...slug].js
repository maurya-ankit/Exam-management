import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';
import Student from '../../../../models/students';
export default async function handler(req, res) {
    const { method } = req;
    const { slug } = req.query;
    if (slug.length < 3) {
        res.status(400).json({ success: false, message: 'Invalid slug' })
        return;
    }
    const [academicYear, semester, courseCode] = slug;
    await dbConnect();
    if (method === 'GET') {
        const gradeRange = await GradeRange.findOne({
            academicYear, semester, courseCode
        });
        res.status(200).json(gradeRange);
    }
    else if (method === 'PATCH') {
        try {
            let body = { ...req.body };
            delete body.academicYear;
            delete body.semester;
            delete body.courseCode;
            const gradeRange = await GradeRange.findOneAndUpdate({
                academicYear, semester, courseCode
            }, body);
            // Process a POST request
            res.status(201).json({ success: true, data: gradeRange })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else if (method === "DELETE") {
        try {
            const gradeRange = await GradeRange.findOneAndDelete({
                academicYear, semester, courseCode
            });
            // Process a POST request
            res.status(201).json({ success: true, data: gradeRange })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}