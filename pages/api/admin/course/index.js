import dbConnect from '../../../../lib/dbConnect';
import Course from '../../../../models/course';
export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    if (method === 'GET') {
        const courses = await Course.find({});
        res.status(200).json(courses);
    }
    else if (method === 'POST') {
        try {
            const course = await Course.create(req.body);
            // Process a POST request
            res.status(201).json({ success: true, data: course })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    } else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}