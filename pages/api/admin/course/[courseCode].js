import dbConnect from '../../../../lib/dbConnect';
import Course from '../../../../models/course';
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
    const { courseCode } = req.query;
    const course = await Course.findOne({
        courseCode
    });
    if (!course) {
        return res.status(404).json({
            success: false,
            error: 'Course not found'
        })
    }
    res.status(200).json({ course });
})

handler.patch(async (req, res) => {
    const { courseCode } = req.query;
    try {
        let body = { ...req.body };
        delete body.courseCode;
        const course = await Course.findOneAndUpdate({
            courseCode
        }, body);
        res.status(201).json({ success: true, data: course })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
});

handler.delete(async (req, res) => {
    const { courseCode } = req.query;
    try {
        const course = await Course.findOneAndDelete({
            courseCode
        });
        res.status(201).json({ success: true, data: course })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
})

export default handler;