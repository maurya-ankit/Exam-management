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
  const { MIS } = request.query;
  const student = await Student.findOne({
    MIS
  });
  response.status(200).json(student);
});

handler.patch(async (request, response) => {
  const { MIS } = request.query;
  try {
    let body = { ...request.body };
    delete body.MIS;
    const student = await Student.findOneAndUpdate(
      {
        MIS: MIS
      },
      body
    );
    // Process a POST request
    response.status(201).json({ success: true, data: student });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

handler.delete(async (request, response) => {
  const { MIS } = request.query;
  try {
    const student = await Student.findOneAndDelete({
      MIS: MIS
    });
    // Process a POST request
    response.status(201).json({ success: true, data: student });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
