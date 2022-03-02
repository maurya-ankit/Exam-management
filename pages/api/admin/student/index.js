import dbConnect from '../../../../lib/dbConnect';
import Student from '../../../../models/students';
export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    if (method === 'GET') {
        const { yearOfAdmission, program, branch } = req.query;
        const students = await Student.find({
            yearOfAdmission,
            program,
            branch
        });
        res.status(200).json(students);
    }
    else if (method === 'POST') {
        try {
            const student = await Student.create(req.body);
            // Process a POST request
            res.status(201).json({ success: true, data: student })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    } else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}