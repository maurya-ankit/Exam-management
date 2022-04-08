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
  const { courseCode } = request.query;
  const course = await Course.findOne({
    courseCode
  });
  if (!course) {
    return response.status(404).json({
      success: false,
      error: 'Course not found'
    });
  }
  response.status(200).json({ course });
});

handler.patch(async (request, response) => {
  const { courseCode } = request.query;
  try {
    let body = { ...request.body };
    delete body.courseCode;
    const course = await Course.findOneAndUpdate(
      {
        courseCode
      },
      body
    );
    response.status(201).json({ success: true, data: course });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

handler.delete(async (request, response) => {
  const { courseCode } = request.query;
  try {
    const course = await Course.findOneAndDelete({
      courseCode
    });
    response.status(201).json({ success: true, data: course });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
