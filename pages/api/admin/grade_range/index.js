import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';
import Student from '../../../../models/students';
export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    if (method === 'GET') {
        const { academicYear, semester, courseCode } = req.query;
        const gradeRanges = await GradeRange.find({
            academicYear,
            semester,
            courseCode
        });
        res.status(200).json(gradeRanges);
    }
    else if (method === 'POST') {
        try {
            const gradeRange = await GradeRange.create(req.body);
            // Process a POST request
            res.status(201).json({ success: true, data: gradeRange })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    } else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}