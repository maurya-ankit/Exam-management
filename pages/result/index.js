import Link from 'next/link';
import React from 'react'
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, Table } from 'reactstrap';
const data = {
    name: "Ankit Maurya",
    yearOfAdmission: "2018",
    program: "B.Tech",
    branch: "Computer Science and Engineering",
    semester: "III",
    academicYear: "2019-2020",
    MIS: "111815007",
    course: [
        {
            courseCode: "BT12109",
            courseName: "Object Oriented Programming System",
            courseCredit: "3",
            gradeEarned: "B+",
        },
        {
            courseCode: "BT22106",
            courseName: "Object Oriented Programming System Lab",
            courseCredit: "1",
            gradeEarned: "A-",
        },
        {
            courseCode: "BT12403",
            courseName: "Probabiltiy and Statistics processes",
            courseCredit: "3",
            gradeEarned: "B-",
        },
        {
            courseCode: "BT12101",
            courseName: "Analysis and Design of Algorithms",
            courseCredit: "3",
            gradeEarned: "C+",
        },
        {
            courseCode: "BT22101",
            courseName: "Analysis and Design of Algorithms Lab",
            courseCredit: "1",
            gradeEarned: "B+",
        },
    ],
    currentSem: {
        credit: "24",
        gradePointEarned: "155",
        SGPA: "6.46",
    },
    cumulativeSem: {
        credit: "71",
        gradePointEarned: "472",
        CGPA: "6.65",
    },
}

function Result() {
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
                                        <td>
                                            Name
                                        </td>
                                        <td>
                                            <b>{data.name}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            MIS
                                        </td>
                                        <td>
                                            <b>{data.MIS}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Programme
                                        </td>
                                        <td>
                                            <b>{data.program}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Branch
                                        </td>
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
                                        <td>
                                            Year of Admission
                                        </td>
                                        <td>
                                            <b>{data.yearOfAdmission}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Semester
                                        </td>
                                        <td>
                                            <b>{data.semester}</b>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Academic Year
                                        </td>
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
                                <tr scope="row" key={index}>
                                    <td>{course.courseCode}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.courseCredit}</td>
                                    <td>{course.gradeEarned}</td>
                                </tr>))}
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
                                                <td>
                                                    Credit
                                                </td>
                                                <td>
                                                    <b>{data.currentSem.credit}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    gradePointEarned
                                                </td>
                                                <td>
                                                    <b>{data.currentSem.gradePointEarned}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    SGPA
                                                </td>
                                                <td>
                                                    <b>{data.currentSem.SGPA}</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardText>
                            </Card>
                        </Col>
                        <Col>
                            <Card body>
                                <CardTitle tag="h5">Cumulative Semester</CardTitle>
                                <CardText>
                                    <Table borderless>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Credit
                                                </td>
                                                <td>
                                                    <b>{data.cumulativeSem.credit}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    gradePointEarned
                                                </td>
                                                <td>
                                                    <b>{data.cumulativeSem.gradePointEarned}</b>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    CGPA
                                                </td>
                                                <td>
                                                    <b>{data.cumulativeSem.CGPA}</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

        </div>
    )
}

export default Result;