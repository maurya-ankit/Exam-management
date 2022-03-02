import dbConnect from '../../../../lib/dbConnect';
import Student from '../../../../models/students';
export default async function handler(req, res) {
    const { method } = req;
    const { MIS } = req.query;
    await dbConnect();
    if (method === 'GET') {
        const student = await Student.findOne({
            MIS
        });
        res.status(200).json(student);
    }
    else if (method === 'PATCH') {
        try {
            let body = { ...req.body };
            delete body.MIS;
            const student = await Student.findOneAndUpdate({
                MIS: MIS
            }, body);
            // Process a POST request
            res.status(201).json({ success: true, data: student })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else if (method === "DELETE") {
        try {
            const student = await Student.findOneAndDelete({
                MIS: MIS
            });
            // Process a POST request
            res.status(201).json({ success: true, data: student })
        } catch (err) {
            res.status(400).json({ success: false, error: err })
        }
    }
    else {
        res.status(400).json({ success: false, message: 'Method not allowed' })
        // Handle any other HTTP method
    }
}