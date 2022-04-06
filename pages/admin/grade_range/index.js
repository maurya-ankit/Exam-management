import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';
import CustomBreadcrumb from '../../../src/components/breadcrumb';
import Course from '../../../models/course';
const gradeOptions = [
  {
    grade: 'O',
    min: 0,
    max: 0
  },
  {
    grade: 'A+',
    min: 0,
    max: 0
  },
  {
    grade: 'A-',
    min: 0,
    max: 0
  },
  {
    grade: 'B+',
    min: 0,
    max: 0
  },
  {
    grade: 'B-',
    min: 0,
    max: 0
  },
  {
    grade: 'C+',
    min: 0,
    max: 0
  },
  {
    grade: 'C-',
    min: 0,
    max: 0
  },
  {
    grade: 'F',
    min: 0,
    max: 0
  }
];

const breadcrumbConfig = [
  {
    label: 'Home',
    link: '/'
  },
  {
    label: 'Admin',
    link: '/admin'
  },
  {
    label: 'Grade Range'
  }
];

// function to return list of all academic years since 2016 as 2016-2017, 2017-2018, 2018-2019 etc.
function getAcademicYears() {
  let years = [];
  let currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 2016; i--) {
    years.push(`${i}-${i + 1}`);
  }
  return years;
}

// generate semesters as int and romans
function getSemesters() {
  let semesters = [];
  for (let i = 1; i <= 8; i++) {
    semesters.push({
      semester: i,
      roman:
        i === 1
          ? 'I'
          : i === 2
          ? 'II'
          : i === 3
          ? 'III'
          : i === 4
          ? 'IV'
          : i === 5
          ? 'V'
          : i === 6
          ? 'VI'
          : i === 7
          ? 'VII'
          : 'VIII'
    });
  }
  return semesters;
}

function GradeRange({ courses }) {
  const [gradeRanges, setGradeRanges] = useState(gradeOptions);
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState('');
  const academicYears = getAcademicYears();
  const semesters = getSemesters();
  const [create, setCreate] = useState(false);
  const [filters, setFilters] = useState({
    academicYear: academicYears[0],
    semester: semesters[0].semester,
    courseCode: courses[0].courseCode
  });
  const [marks, setMarks] = useState(students);
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      academicYear: filters.academicYear,
      semester: filters.semester,
      courseCode: filters.courseCode,
      ranges: gradeRanges
    };
    axios
      .post(`/api/admin/grade_range`, body)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  function handleUpdate(e) {
    e.preventDefault();
    const body = {
      academicYear: filters.academicYear,
      semester: filters.semester,
      courseCode: filters.courseCode,
      ranges: gradeRanges
    };
    axios
      .patch(
        `/api/admin/grade_range/${body.academicYear}/${body.semester}/${body.courseCode}`,
        body
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  function handleAddStudent(e) {
    e.preventDefault();
    setStudents([...students, student]);
    const body = {
      // academicYear: filters.academicYear,
      // semester: filters.semester,
      // courseCode: filters.courseCode,
      // students: [...students.map(stu => stu.MIS), student]
      MIS: student,
      courseCode: filters.courseCode,
      marks: 0,
      grade: '',
      academicYear: filters.academicYear,
      semester: filters.semester
    };
    axios
      .post(`/api/admin/student_grade`, body)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  function handleOnFilterChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  function handleSaveMarks(students) {
    axios.patch(`/api/admin/student_grade/${filters.courseCode}`, {
      students
    });
  }
  function assignGrades() {
    // based on grade reanges, assign grades to students via marks
    console.log(gradeRanges);
    const assigned = students.map(student => {
      for (let i = 0; i < gradeRanges.length; i++) {
        console.log(i, gradeRanges[i].min, gradeRanges[i].max, student.marks);
        if (
          gradeRanges[i].min <= student.marks &&
          gradeRanges[i].max >= student.marks
        ) {
          console.log(gradeRanges[i]);
          student.grade = gradeRanges[i].grade;
          break;
        }
      }
      return student;
    });
    handleSaveMarks(assigned);
  }
  useEffect(() => {
    axios
      .get(
        `/api/admin/grade_range/${filters.academicYear}/${filters.semester}/${filters.courseCode}`
      )
      .then(res => {
        console.log(res);
        setGradeRanges(res.data.ranges);
        setStudents(res.data.students);
      })
      .catch(err => {
        console.log(err);
        setCreate(true);
        setGradeRanges(gradeOptions);
        setStudents([]);
      });
  }, [filters]);
  return (
    <div>
      <CustomBreadcrumb items={breadcrumbConfig} />
      <Row>
        <Col>
          <FormGroup>
            <Label for="academicYearSelect">Select Academic Year</Label>
            <Input
              id="academicYearSelect"
              name="academicYear"
              type="select"
              value={filters.academicYear}
              onChange={handleOnFilterChange}
            >
              {getAcademicYears().map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="semesterSelect">Select Semester</Label>
            <Input
              id="semesterSelect"
              name="semester"
              type="select"
              value={filters.semester}
              onChange={handleOnFilterChange}
            >
              {getSemesters().map(semester => (
                <option key={semester.semester} value={semester.semester}>
                  {semester.roman}
                </option>
              ))}
            </Input>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label for="courseCodeSelect">Select Course</Label>
            <Input
              id="courseCodeSelect"
              name="courseCode"
              type="select"
              value={filters.courseCode}
              onChange={handleOnFilterChange}
            >
              {courses.map((course, index) => {
                return (
                  <option key={index} value={course.courseCode}>
                    {course.courseCode} {course.courseName}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Card>
        <CardBody>
          <Table borderless>
            <tbody>
              <tr>
                <td>Course Code</td>
                <td>
                  <b>{filters.courseCode}</b>
                </td>
              </tr>
              <tr>
                <td>Semester</td>
                <td>
                  <b>{filters.semester}</b>
                </td>
              </tr>
              <tr>
                <td>Academic Year</td>
                <td>
                  <b>{filters.academicYear}</b>
                </td>
              </tr>
            </tbody>
          </Table>
          <Form onSubmit={create ? handleSubmit : handleUpdate}>
            {gradeRanges.map((grade, index) => (
              <Row key={index}>
                <Col>
                  <FormGroup>
                    <Label for="courseCode">Grade</Label>
                    <Input
                      id="grade"
                      name="grade"
                      placeholder="Grade"
                      type="text"
                      value={grade.grade}
                      disabled
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="min">Min</Label>
                    <Input
                      id="min"
                      name="min"
                      placeholder="Min"
                      type="number"
                      min={0}
                      max={100}
                      value={grade.min}
                      onChange={e => {
                        grade.min = e.target.value;
                        setGradeRanges([...gradeRanges]);
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="max">Max</Label>
                    <Input
                      id="max"
                      name="max"
                      placeholder="Max"
                      type="number"
                      min={0}
                      max={100}
                      value={grade.max}
                      onChange={e => {
                        grade.max = e.target.value;
                        setGradeRanges([...gradeRanges]);
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            ))}
            <Button type="submit" className="float-end">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
      {create ? (
        <>
          <Alert color="danger">Course is not yet created, create first</Alert>
        </>
      ) : (
        <Card>
          <CardHeader>
            <Row>
              <Col>
                <b>Enrolled Students</b>
              </Col>
              <Col>
                <Form onSubmit={handleAddStudent}>
                  <Row>
                    <Col md="8">
                      <Input
                        placeholder="Add Student"
                        type="text"
                        name="MIS"
                        value={student}
                        onChange={e => {
                          setStudent(e.target.value);
                        }}
                      />
                    </Col>
                    <Col>
                      <Button type="submit" className="float-end">
                        Add
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
              <Col>
                <Input placeholder="Type to Search" />
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Student ID</th>
                    <th>Student Name</th>
                    <th>Marks</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={index}>
                      <td>{student.MIS}</td>
                      <td>{student.name}</td>
                      <td width={100}>
                        <Input
                          value={student.marks}
                          onChange={e => {
                            student.marks = e.target.value;
                            setMarks([...marks]);
                          }}
                          type="number"
                          min={0}
                        />
                      </td>
                      <td>{student.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="float-end" onClick={assignGrades}>
                Assign Grades
              </Button>
              <Button
                className="float-end mx-2"
                onClick={() => handleSaveMarks(students)}
              >
                Save marks
              </Button>
            </Form>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default GradeRange;

// get serversideprops
export async function getServerSideProps(context) {
  let courses = await Course.find();
  courses = JSON.parse(JSON.stringify(courses));
  return {
    props: {
      courses
    }
  };
}
