import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import GradeRange from '../../../../models/gradeRange';

const handler = nc({
  onError: (error, request, response) => {
    console.error(error.stack);
    response.status(500).end('Something broke!');
  },
  onNoMatch: (request, response) => {
    response.status(404).end('Page is not found');
  }
});

handler.use(async (request, response, next) => {
  await databaseConnect();
  next();
});

handler.get(async (request, response) => {
  const { academicYear, semester, courseCode } = request.query;
  const gradeRanges = await GradeRange.find({
    academicYear,
    semester,
    courseCode
  });
  response.status(200).json(gradeRanges);
});
handler.post(async (request, response) => {
  try {
    const gradeRange = await GradeRange.create(request.body);
    // Process a POST request
    response.status(201).json({ success: true, data: gradeRange });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
