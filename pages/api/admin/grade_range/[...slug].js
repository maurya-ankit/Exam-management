import nc from 'next-connect';

import databaseConnect from '../../../../lib/databaseConnect';
import GradeRange from '../../../../models/gradeRange';
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

handler.use((request, response, next) => {
  const { slug } = request.query;
  if (slug.length < 3) {
    response.status(400).json({ success: false, message: 'Invalid slug' });
    return;
  }
  next();
});

handler.get(async (request, response) => {
  const { slug } = request.query;
  const [academicYear, semester, courseCode] = slug;
  const gradeRangeStu = await GradeRange.findOne(
    { academicYear, semester, courseCode },
    {
      students: 1
    }
  );
  const studentInfo = await Students.find(
    {
      MIS: {
        $in: gradeRangeStu.students
      }
    },
    {
      name: 1,
      MIS: 1
    }
  );
  let gradeRange = await GradeRange.aggregate([
    {
      $match: {
        academicYear: academicYear,
        semester: semester,
        courseCode: courseCode
      }
    },
    {
      $lookup: {
        from: 'studentgrades',
        let: {
          students: '$students'
        },
        pipeline: [
          {
            $match: {
              courseCode: courseCode,
              MIS: {
                $in: gradeRangeStu.students
              }
            }
          }
        ],
        as: 'students'
      }
    },
    {
      $project: {
        students: 1,
        ranges: 1
      }
    }
  ]).exec();
  if (gradeRange.length === 0) {
    return response.status(404).json({
      success: false,
      error: 'Grade range not found'
    });
  }
  gradeRange = gradeRange[0];
  // append student name
  gradeRange.students = gradeRange.students.map(stu => {
    const student = studentInfo.find(stuInfo => stuInfo.MIS === stu.MIS);
    if (student) {
      stu.name = student.name;
    }
    return stu;
  });
  console.log(gradeRange);
  response.status(200).json(gradeRange);
});
handler.patch(async (request, response) => {
  const { slug } = request.query;
  const [academicYear, semester, courseCode] = slug;
  try {
    let body = { ...request.body };
    if (body.academicYear) delete body.academicYear;
    if (body.semester) delete body.semester;
    if (body.courseCode) delete body.courseCode;
    if (body.students) {
      let students = new Set(body.students);
      body.students = [...students];
    }
    const gradeRange = await GradeRange.findOneAndUpdate(
      {
        academicYear,
        semester,
        courseCode
      },
      body,
      { new: true }
    );
    response.status(201).json({ success: true, data: gradeRange });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

handler.delete(async (request, response) => {
  const { slug } = request.query;
  const [academicYear, semester, courseCode] = slug;
  try {
    const gradeRange = await GradeRange.findOneAndDelete({
      academicYear,
      semester,
      courseCode
    });
    response.status(201).json({ success: true, data: gradeRange });
  } catch (error) {
    response.status(400).json({ success: false, error: error });
  }
});

export default handler;
