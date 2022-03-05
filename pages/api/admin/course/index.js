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
    const courses = await Course.find({});
    res.status(200).json(courses);
})
handler.post(async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({ success: true, data: course })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
})

export default handler;