import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import Admin from '../../../../models/admin';

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
  try {
    const role = request.query.role ? request.query.role : 'admin';
    const admins = await Admin.find({ role });
    return response.status(200).json(admins);
  } catch (error) {
    return response.status(500).json({ success: false, error: error });
  }
});
handler.post(async (request, response) => {
  try {
    const admin = await Admin.create(request.body);
    // Process a POST request
    response.status(201).json({ success: true, data: admin });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
