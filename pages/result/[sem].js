import { ObjectId } from 'mongodb';
import Link from 'next/link';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
  Table
} from 'reactstrap';

import databaseConnect from '../../lib/databaseConnect';
import Course from '../../models/course';
import StudentGrade from '../../models/studentGrade';
import Students from '../../models/students';

const gradePoint = {
  O: 10,
  'A+': 9,
  'A-': 8,
  'B+': 7,
  'B-': 6,
  'C+': 5,
  'C-': 4,
  F: 0
};

function Result({ data }) {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/result">Result</Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>{data.semester}</BreadcrumbItem>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <i className="bi bi-card-text me-2"></i> Result
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>
                      <b>{data.name}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>MIS</td>
                    <td>
                      <b>{data.MIS}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Programme</td>
                    <td>
                      <b>{data.program}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Branch</td>
                    <td>
                      <b>{data.branch}</b>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Year of Admission</td>
                    <td>
                      <b>{data.yearOfAdmission}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Semester</td>
                    <td>
                      <b>{data.semester}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Academic Year</td>
                    <td>
                      <b>{data.academicYear}</b>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Table bordered striped>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Course Credit</th>
                <th>Grade Earned</th>
              </tr>
            </thead>
            <tbody>
              {data.course.map((course, index) => (
                <tr key={index}>
                  <td>{course.courseCode}</td>
                  <td>{course.courseName}</td>
                  <td>{course.courseCredit}</td>
                  <td>{course.gradeEarned}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col>
              <Card body>
                <CardTitle tag="h5">Current Semester</CardTitle>
                <CardText>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>Credit</td>
                        <td>
                          <b>{data.currentSem?.credit}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>gradePointEarned</td>
                        <td>
                          <b>{data.currentSem?.gradePointEarned}</b>
                        </td>
                      </tr>
                      <tr>
                        <td>SGPA</td>
                        <td>
                          <b>{data.currentSem?.SGPA}</b>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </CardText>
              </Card>
            </Col>
            <Col>
              {data.cumulativeSem && (
                <Card body>
                  <CardTitle tag="h5">Cumulative Semester</CardTitle>
                  <CardText>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>Credit</td>
                          <td>
                            <b>{data.cumulativeSem?.credit}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>gradePointEarned</td>
                          <td>
                            <b>{data.cumulativeSem?.gradePointEarned}</b>
                          </td>
                        </tr>
                        <tr>
                          <td>CGPA</td>
                          <td>
                            <b>{data.cumulativeSem?.CGPA}</b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardText>
                </Card>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
}

export default Result;

export async function getServerSideProps(context) {
  await databaseConnect();
  const { sem } = context.query;
  const email = 'ankitmaurya18@cse.iiitp.ac.in';
  let semInfo = await Students.findOne({ email: email });
  let data = semInfo.semesters.find(item => item.semester === sem);
  delete semInfo.semesters;
  semInfo = JSON.parse(JSON.stringify(semInfo));
  const allCourses = await Course.find();
  semInfo['course'] = await Promise.all(
    data.course.map(async item => {
      return await StudentGrade.findById(ObjectId(item));
    })
  );
  semInfo['course'] = semInfo.course.map(item => {
    const courseDetails = allCourses.find(
      course => course.courseCode === item.courseCode
    );
    return {
      courseCode: item.courseCode,
      courseName: courseDetails.courseName,
      courseCredit: courseDetails.courseCredit,
      gradeEarned: item.grade
    };
  });
  semInfo['semester'] = sem;
  semInfo['academicYear'] = data['academicYear'];
  const currentSem = {};
  currentSem.credit = semInfo.course.reduce(
    (accumulator, item) => accumulator + item.courseCredit,
    0
  );
  currentSem.gradePointEarned = semInfo.course.reduce(
    (accumulator, item) =>
      accumulator + item.courseCredit * gradePoint[item.gradeEarned],
    0
  );
  currentSem.SGPA = currentSem.gradePointEarned / currentSem.credit;
  semInfo['currentSem'] = currentSem;

  semInfo = JSON.parse(JSON.stringify(semInfo));

  return {
    props: {
      data: semInfo
    }
  };
}
