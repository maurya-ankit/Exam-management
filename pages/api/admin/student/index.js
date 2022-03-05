import dbConnect from '../../../../lib/dbConnect';
import Student from '../../../../models/students';
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
    const { yearOfAdmission, program, branch } = req.query;
    const students = await Student.find({
        yearOfAdmission,
        program,
        branch
    });
    res.status(200).json(students);
});
handler.post(async (req, res) => {
    try {
        const student = await Student.create(req.body);
        // Process a POST request
        res.status(201).json({ success: true, data: student })
    } catch (err) {
        res.status(400).json({ success: false, error: err })
    }
})

export default handler;