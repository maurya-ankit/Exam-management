import Link from 'next/link';
import React from 'react';
import { Row, Col, Card, CardTitle, Form, FormGroup, Label, Input, Button, CardBody, Table, CardFooter, Pagination, PaginationItem, PaginationLink, Breadcrumb, BreadcrumbItem } from 'reactstrap'


const courses = [
    {
        courseCode: 'CSE 101',
        courseName: 'Introduction to Computer Science',
        credit: 3
    },
    {
        courseCode: 'CSE 102',
        courseName: 'Introduction to Computer Science',
        credit: 3
    },
    {
        courseCode: 'CSE 103',
        courseName: 'Introduction to Computer Science',
        credit: 3
    },
    {
        courseCode: 'CSE 104',
        courseName: 'Introduction to Computer Science',
        credit: 3
    },
]

function AddCourse() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
    }
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="/">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href="/admin">Admin</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Add course</BreadcrumbItem>
            </Breadcrumb>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-bell me-2"> </i>
                    Add Course
                </CardTitle>
                <CardBody>
                    <Form className='' onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="courseCode">Course Code</Label>
                                    <Input
                                        id="courseCode"
                                        name="courseCode"
                                        placeholder="Course Code"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="courseName">Course Name</Label>
                                    <Input
                                        id="courseName"
                                        name="courseName"
                                        placeholder="Course Name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="courseCredit">Course Credit</Label>
                                    <Input
                                        id="courseCredit"
                                        name="courseCredit"
                                        placeholder="Course Credit"
                                        type="number"
                                        min="1"
                                    />
                                </FormGroup>

                            </Col>
                        </Row>
                        <Button className='float-end' type="submit">Submit</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>
                    Course List
                </CardTitle>
                <CardBody className="">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Course Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.courseCode}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.credit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter>
                    <Pagination>
                        <PaginationItem>
                            <PaginationLink
                                first
                                href="#"
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                previous
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                3
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                4
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">
                                5
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                next
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                href="#"
                                last
                            />
                        </PaginationItem>
                    </Pagination>
                </CardFooter>
            </Card>
        </div>
    )
}

export default AddCourse