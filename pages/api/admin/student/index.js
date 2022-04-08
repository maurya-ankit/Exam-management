import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import Student from '../../../../models/students';

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
  const { yearOfAdmission, program, branch } = request.query;
  const students = await Student.find({
    yearOfAdmission,
    program,
    branch
  });
  response.status(200).json(students);
});
handler.post(async (request, response) => {
  try {
    const student = await Student.create(request.body);
    // Process a POST request
    response.status(201).json({ success: true, data: student });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
