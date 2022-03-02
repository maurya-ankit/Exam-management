import Link from "next/link";
import React, { useState } from "react";
import {
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
} from "reactstrap";
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
        label: "Grade Range",
        link: "/admin/grade_range"
    },
    {
        label: "Add"
    }

]

function GradeRange() {
    const [gradeRanges, setGradeRanges] = useState(gradeOptions);
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    return (
        <div>
            <CustomBreadcrumb
                items={breadcrumbConfig}
            />
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Grade Range
                </CardHeader>
                <CardBody>
                    <Form onClick={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="academicYear">Academic Year</Label>
                                    <Input
                                        id="academicYear"
                                        name="academicYear"
                                        placeholder="Academic Year"
                                        type="text"
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="semester">Semester</Label>
                                    <Input
                                        id="semester"
                                        name="semester"
                                        placeholder="Semester"
                                        type="text"
                                        required
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="courseCode">Course Code</Label>
                                    <Input
                                        id="courseCode"
                                        name="courseCode"
                                        placeholder="Course Code"
                                        type="text"
                                        required
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <hr />
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
        </div>
    );
}

export default GradeRange;
