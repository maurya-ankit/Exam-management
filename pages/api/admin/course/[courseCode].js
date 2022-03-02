import dbConnect from '../../../../lib/dbConnect';
import Course from '../../../../models/course';
export default async function handler(req, res) {
    const { method } = req;
    const { courseCode } = req.query;
    await dbConnect();
    if (method === 'GET') {
        const course = await Course.findOne({
            courseCode
        });
        res.status(200).json(course);
    }
    else if (method === 'PATCH') {
        try {
            let body = { ...req.body };
            delete body.courseCode;
            const course = await Course.findOneAndUpdate({
                courseCode
            }, body);
            // Process a POST request
            res.status(201).json({ success: true, data: course })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else if (method === "DELETE") {
        try {
            const course = await Course.findOneAndDelete({
                courseCode
            });
            // Process a POST request
            res.status(201).json({ success: true, data: course })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}