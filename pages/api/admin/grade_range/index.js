import dbConnect from '../../../../lib/dbConnect';
import GradeRange from '../../../../models/gradeRange';

import nc from 'next-connect';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  }
});

handler.use(async (req, res, next) => {
  await dbConnect();
  next();
});

handler.get(async (req, res) => {
  const { academicYear, semester, courseCode } = req.query;
  const gradeRanges = await GradeRange.find({
    academicYear,
    semester,
    courseCode
  });
  res.status(200).json(gradeRanges);
});
handler.post(async (req, res) => {
  try {
    const gradeRange = await GradeRange.create(req.body);
    // Process a POST request
    res.status(201).json({ success: true, data: gradeRange });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

export default handler;
