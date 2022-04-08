import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import GradeRange from '../../../../models/gradeRange';
import StudentGrade from '../../../../models/studentGrade';
import Students from '../../../../models/students';

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
  const gradeRange = await GradeRange.findOne(
    { academicYear, semester, courseCode },
    {
      students: 1
    }
  );
  if (!gradeRange) {
    response.status(404).end('Page is not found');
  }
  const studentGrade = await StudentGrade.find(
    // multi-match
    {
      $or: [
        {
          courseCode
        },
        {
          MIS: {
            $in: gradeRange.students
          }
        }
      ]
    }
  );
  response.status(200).json(studentGrade);
});
handler.post(async (request, response) => {
  try {
    const { MIS, courseCode, marks, grade, academicYear, semester } =
      request.body;
    console.log(request.body);
    const studentGrade = await StudentGrade.create({
      MIS,
      courseCode,
      marks,
      grade
    });
    await GradeRange.findOneAndUpdate(
      {
        academicYear,
        semester,
        courseCode
      },
      {
        // push MIS to students array as set
        $addToSet: {
          students: MIS
        }
      }
    );
    const student = await Students.updateOne(
      {
        MIS,
        'semesters.semester': semester,
        'semesters.academicYear': academicYear
      },
      {
        $addToSet: {
          'semesters.$.course': studentGrade._id.toString()
        }
      }
    );
    console.log(student);
    if (!student.modifiedCount) {
      // first create semester and add course
      await Students.findOneAndUpdate(
        {
          MIS
        },
        {
          $push: {
            semesters: {
              semester,
              academicYear,
              course: [studentGrade._id.toString()]
            }
          }
        }
      );
    }
    response.status(201).json({ success: true, data: studentGrade });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
