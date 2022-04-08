import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import Course from '../../../../models/course';

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
  const courses = await Course.find({});
  response.status(200).json(courses);
});
handler.post(async (request, response) => {
  try {
    const course = await Course.create(request.body);
    response.status(201).json({ success: true, data: course });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
