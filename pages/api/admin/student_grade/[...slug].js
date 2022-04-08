import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import StudentGrade from '../../../../models/studentGrade';

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

handler.patch(async (request, response) => {
  // get list of students with marks and grade from body
  const { slug } = request.query;
  const courseCode = slug[0];
  const { students } = request.body;
  students.forEach(async student => {
    const a = await StudentGrade.findOneAndUpdate(
      {
        MIS: student.MIS,
        courseCode
      },
      {
        $set: {
          marks: Number.parseInt(student.marks),
          grade: student.grade
        }
      }
    );
    console.log({
      a
    });
  });
  response.status(200).json({ success: true, message: 'Successfully updated' });
});
export default handler;
