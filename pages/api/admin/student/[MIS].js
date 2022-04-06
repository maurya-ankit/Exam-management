import dbConnect from '../../../../lib/dbConnect';
import Student from '../../../../models/students';
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
  const { MIS } = req.query;
  const student = await Student.findOne({
    MIS
  });
  res.status(200).json(student);
});

handler.patch(async (req, res) => {
  const { MIS } = req.query;
  try {
    let body = { ...req.body };
    delete body.MIS;
    const student = await Student.findOneAndUpdate(
      {
        MIS: MIS
      },
      body
    );
    // Process a POST request
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

handler.delete(async (req, res) => {
  const { MIS } = req.query;
  try {
    const student = await Student.findOneAndDelete({
      MIS: MIS
    });
    // Process a POST request
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
});

export default handler;
