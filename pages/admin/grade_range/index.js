import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
  Alert,
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

import Course from '../../../models/course';
import CustomBreadcrumb from '../../../src/components/breadcrumb';
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
  for (let index = currentYear; index >= 2016; index--) {
    years.push(`${index}-${index + 1}`);
  }
  return years;
}
const integerToRoman = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII'
};
// generate semesters as int and romans
function getSemesters() {
  let semesters = [];
  for (let index = 1; index <= 8; index++) {
    semesters.push({
      semester: index,
      roman: integerToRoman[`${index}`]
    });
  }
  return semesters;
}

function GradeRange({ courses }) {
  const [gradeRanges, setGradeRanges] = useState(gradeOptions);
  const [students, setStudents] = useState([]);
  const [accordionConfig, setAccordionConfig] = useState({
    grade: false,
    student: true
  });
  const [student, setStudent] = useState('');
  const academicYears = getAcademicYears();
  const semesters = getSemesters();
  const [create, setCreate] = useState(false);
  const [filters, setFilters] = useState({
    academicYear: academicYears[0],
    semester: semesters[0].semester,
    courseCode: courses[0].courseCode
  });
  const [loading, setLoading] = useState({
    fetch: true,
    gradeSubmission: false,
    studentSubmission: false,
    saveMarks: false
  });
  const [marks, setMarks] = useState(students);
  function handleSubmit(event_) {
    setLoading(previous => ({ ...previous, gradeSubmission: true }));
    event_.preventDefault();
    const body = {
      academicYear: filters.academicYear,
      semester: filters.semester,
      courseCode: filters.courseCode,
      ranges: gradeRanges
    };
    axios
      .post(`/api/admin/grade_range`, body)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(previous => ({ ...previous, gradeSubmission: false }));
      });
  }
  function handleUpdate(event_) {
    setLoading(previous => ({ ...previous, gradeSubmission: true }));
    event_.preventDefault();
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
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(previous => ({ ...previous, gradeSubmission: false }));
      });
  }
  function handleAddStudent(event_) {
    setLoading(previous => ({ ...previous, studentSubmission: true }));
    event_.preventDefault();
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
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(previous => ({ ...previous, studentSubmission: false }));
      });
  }
  function handleOnFilterChange(event_) {
    setFilters({
      ...filters,
      [event_.target.name]: event_.target.value
    });
  }

  function handleSaveMarks(students) {
    axios.patch(`/api/admin/student_grade/${filters.courseCode}`, {
      students
    });
  }
  function assignGrades() {
    // based on grade reanges, assign grades to students via marks
    const assigned = students.map(student => {
      for (const gradeRange of gradeRanges) {
        if (
          gradeRange.min <= student.marks &&
          gradeRange.max >= student.marks
        ) {
          student.grade = gradeRange.grade;
          break;
        }
      }
      return student;
    });
    handleSaveMarks(assigned);
  }
  useEffect(() => {
    setLoading(previous => ({ ...previous, fetch: true }));
    axios
      .get(
        `/api/admin/grade_range/${filters.academicYear}/${filters.semester}/${filters.courseCode}`
      )
      .then(response => {
        setGradeRanges(response.data.ranges);
        setStudents(response.data.students);
        setCreate(false);
      })
      .catch(error => {
        console.log(error);
        setCreate(true);
        setGradeRanges(gradeOptions);
        setStudents([]);
      })
      .finally(() => {
        setLoading(previous => ({ ...previous, fetch: false }));
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
        <CardHeader
          onClick={() =>
            setAccordionConfig(previous => ({
              ...previous,
              grade: !previous.grade
            }))
          }
        >
          <p>
            {accordionConfig.grade ? (
              <i className="bi bi-chevron-up"></i>
            ) : (
              <i className="bi bi-chevron-down"></i>
            )}
            <span className="mx-4">Grade Range distribution</span>
          </p>
        </CardHeader>
        {accordionConfig.grade && (
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
                        onChange={event_ => {
                          grade.min = event_.target.value;
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
                        onChange={event_ => {
                          grade.max = event_.target.value;
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
        )}
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
                        onChange={event_ => {
                          setStudent(event_.target.value);
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
                  {loading.fetch ? (
                    <tr>
                      <td>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                      <td width={100}>
                        <Skeleton />
                      </td>
                      <td>
                        <Skeleton />
                      </td>
                    </tr>
                  ) : (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td>{student.MIS}</td>
                        <td>{student.name}</td>
                        <td width={100}>
                          <Input
                            value={student.marks}
                            onChange={event_ => {
                              student.marks = event_.target.value;
                              setMarks([...marks]);
                            }}
                            type="number"
                            min={0}
                          />
                        </td>
                        <td>{student.grade}</td>
                      </tr>
                    ))
                  )}
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

export async function getServerSideProps() {
  let courses = await Course.find();
  courses = JSON.parse(JSON.stringify(courses));
  return {
    props: {
      courses
    }
  };
}
