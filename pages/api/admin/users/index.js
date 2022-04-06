import dbConnect from '../../../../lib/dbConnect';
import nc from 'next-connect';
import Admin from '../../../../models/admin';

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
  try {
    const role = req.query.role ? req.query.role : 'admin';
    const admins = await Admin.find({ role });
    return res.status(200).json(admins);
  } catch {
    return res.status(500).json({ success: false, error: err });
  }
});
handler.post(async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    // Process a POST request
    res.status(201).json({ success: true, data: admin });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

export default handler;
