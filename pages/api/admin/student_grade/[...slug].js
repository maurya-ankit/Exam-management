import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';

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

handler.use((req, res, next) => {
    const { slug } = req.query;
    if (slug.length < 3) {
        res.status(400).json({ success: false, message: 'Invalid slug' })
        return;
    }
    next();
})

handler.get(async (req, res) => {

});
handler.patch(async (req, res) => {

});

handler.delete(async (req, res) => {
});

export default handler;