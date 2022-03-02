import Link from "next/link";
import React, { useState } from "react";
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

function GradeRange() {

    const [marks, setMarks] = useState(students);
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    function handleAddStudent(e) {
        e.preventDefault();
        console.log("Form submitted");
    }

    return (
        <div>
            <CustomBreadcrumb
                items={breadcrumbConfig}
            />
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Select Academic Year
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                        >
                            <option>
                                2018-2019
                            </option>
                            <option>
                                2019-2020
                            </option>
                            <option>
                                2020-2021
                            </option>
                            <option>
                                2021-2022
                            </option>
                            <option>
                                2022-2023
                            </option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Select Semester
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                        >
                            {["I", "II", "III", "IV", "V", "VI", "VII", "VIII"].map((item, index) => {
                                return (
                                    <option key={index}>
                                        {item}
                                    </option>
                                );
                            })}
                        </Input>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label for="exampleSelect">
                            Select Course
                        </Label>
                        <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                        >
                            {["BT101", "BT121", "BT234", "BTCSE", "BTXFC", "BT0001", "BT545", "BT601"].map((item, index) => {
                                return (
                                    <option key={index}>
                                        {item}
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
                                    <b>{"BT101"}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Course Name
                                </td>
                                <td>
                                    <b>{"Subject name"}</b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Academic Year
                                </td>
                                <td>
                                    <b>{"2021-2022"}</b>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    Grade
                                </th>
                                <th>
                                    Min
                                </th>
                                <th>
                                    Max
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradeOptions.map((grade, index) => (
                                <tr key={index}>
                                    <td>
                                        {grade.grade}
                                    </td>
                                    <td>
                                        {grade.min}
                                    </td>
                                    <td>
                                        {grade.max}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <Row>
                        <Col>
                            <b>Enrolled Students</b>
                        </Col>
                        <Col>
                            <Form>
                                <Row onClick={handleAddStudent}>
                                    <Col md="8">
                                        <Input
                                            placeholder="Add Student"
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
