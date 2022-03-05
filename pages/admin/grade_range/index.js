import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Table } from "reactstrap";
import CustomBreadcrumb from "../../../src/components/breadcrumb";

const gradeOptions = [
    {
        grade: "O",
        min: 0,
        max: 0,
    },
    {
        grade: "A+",
        min: 0,
        max: 0,
    },
    {
        grade: "A-",
        min: 0,
        max: 0,
    },
    {
        grade: "B+",
        min: 0,
        max: 0,
    },
    {
        grade: "B-",
        min: 0,
        max: 0,
    },
    {
        grade: "C+",
        min: 0,
        max: 0,
    },
    {
        grade: "C-",
        min: 0,
        max: 0,
    },
    {
        grade: "F",
        min: 0,
        max: 0,
    },
];

const students = [
    {
        MIS: "MIS-00001",
        name: "John Doe",
        marks: 0
    },
    {
        MIS: "MIS-00002",
        name: "Jane Doe",
        marks: 0
    },
    {
        MIS: "MIS-00003",
        name: "John Doe",
        marks: 0
    },
    {
        MIS: "MIS-00004",
        name: "Jane Doe",
        marks: 0
    },
]

const breadcrumbConfig = [
    {
        label: "Home",
        link: "/"
    },
    {
        label: "Admin",
        link: "/admin"
    },
    {
        label: "Grade Range"
    }
]

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
            roman: i === 1 ? "I" : i === 2 ? "II" : i === 3 ? "III" : i === 4 ? "IV" : i === 5 ? "V" : i === 6 ? "VI" : i === 7 ? "VII" : "VIII"
        });
    }
    return semesters;
}

function GradeRange() {
    const [gradeRanges, setGradeRanges] = useState(gradeOptions);
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState("");
    const academicYears = getAcademicYears();
    const semesters = getSemesters();
    const [create, setCreate] = useState(false);
    const courses = [
        {
            courseCode: "CSE-101",
            courseName: "Computer Science I"
        },
        {
            courseCode: "CSE-102",
            courseName: "Computer Science II"
        },
        {
            courseCode: "CSE-103",
            courseName: "Computer Science III"
        },
    ]
    const [filters, setFilters] = useState({
        academicYear: academicYears[0],
        semester: semesters[0].semester,
        courseCode: courses[0].courseCode
    })
    const [marks, setMarks] = useState(students);
    function handleSubmit(e) {
        e.preventDefault();
        const body = {
            academicYear: filters.academicYear,
            semester: filters.semester,
            courseCode: filters.courseCode,
            ranges: gradeRanges
        }
        axios.post(`/api/admin/grade_range`, body)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    function handleUpdate(e) {
        e.preventDefault();
        const body = {
            academicYear: filters.academicYear,
            semester: filters.semester,
            courseCode: filters.courseCode,
            ranges: gradeRanges
        }
        axios.patch(`/api/admin/grade_range/${body.academicYear}/${body.semester}/${body.courseCode}`, body)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    function handleAddStudent(e) {
        e.preventDefault();
        setStudents([...students, student]);
        const body = {
            academicYear: filters.academicYear,
            semester: filters.semester,
            courseCode: filters.courseCode,
            students: [...students.map(stu => stu.MIS), student]
        }
        axios.patch(`/api/admin/grade_range/${body.academicYear}/${body.semester}/${body.courseCode}`, body)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    function handleOnFilterChange(e) {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        axios.get(`/api/admin/grade_range/${filters.academicYear}/${filters.semester}/${filters.courseCode}`)
            .then(res => {
                console.log(res);
                setGradeRanges(res.data.ranges);
                setStudents(res.data.students);
            }).catch(err => {
                console.log(err);
                setCreate(true);
                setGradeRanges(gradeOptions);
                setStudents([]);
            })
    }, [filters])
    return (
        <div>
            <CustomBreadcrumb
                items={breadcrumbConfig}
            />
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="academicYearSelect">
                            Select Academic Year
                        </Label>
                        <Input
                            id="academicYearSelect"
                            name="academicYear"
                            type="select"
                            value={filters.academicYear}
                            onChange={handleOnFilterChange}
                        >
                            {getAcademicYears().map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="semesterSelect">
                            Select Semester
                        </Label>
                        <Input
                            id="semesterSelect"
                            name="semester"
                            type="select"
                            value={filters.semester}
                            onChange={handleOnFilterChange}
                        >
                            {getSemesters().map((semester) => (
                                <option key={semester.semester} value={semester.semester}>{semester.roman}</option>
                            ))}
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="courseCodeSelect">
                            Select Course
                        </Label>
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
                                <td>
                                    Course Code
                                </td>
                                <td>
                                    <b>{filters.courseCode}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Semester
                                </td>
                                <td>
                                    <b>{filters.semester}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Academic Year
                                </td>
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
                                            onChange={(e) => {
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
                                            onChange={(e) => {
                                                grade.max = e.target.value;
                                                setGradeRanges([...gradeRanges]);
                                            }}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        ))}
                        <Button type="submit" className="float-end">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
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
                                            onChange={(e) => {
                                                setStudent(e.target.value);
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <Button type="submit" className="float-end">Add</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                        <Col>
                            <Input
                                placeholder="Type to Search"
                            />
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        Student ID
                                    </th>
                                    <th>
                                        Student Name
                                    </th>
                                    <th>
                                        Marks
                                    </th>
                                    <th>
                                        Grade
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>
                                            {student.MIS}
                                        </td>
                                        <td>
                                            {student.name}
                                        </td>
                                        <td width={100}>
                                            <Input
                                                value={student.marks}
                                                onChange={(e) => {
                                                    student.marks = e.target.value;
                                                    setMarks([...marks]);
                                                }}
                                                type="number"
                                                min={0}
                                            />
                                        </td>
                                        <td>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button className="float-end" type="submit">Assign Grades</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default GradeRange;
