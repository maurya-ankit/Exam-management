import Link from "next/link";
import React, { useState } from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Table } from "reactstrap";

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

function GradeRange() {

    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href="/admin">Admin</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Grade Range</BreadcrumbItem>
            </Breadcrumb>
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
                    <b>Enrolled Students</b>
                </CardHeader>
                <CardBody>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    Student ID
                                </th>
                                <th>
                                    Student Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {"STU" + index}
                                    </td>
                                    <td>
                                        {"Student " + index}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
}

export default GradeRange;
