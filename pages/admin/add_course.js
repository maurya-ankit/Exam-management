import Link from 'next/link';
import React from 'react';
import { Row, Col, Card, CardTitle, Form, FormGroup, Label, Input, Button, CardBody, Table, CardFooter, Pagination, PaginationItem, PaginationLink, Breadcrumb, BreadcrumbItem } from 'reactstrap'

function AddCourse() {
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
                    <Form className=''>
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
                        <Button>Submit</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>
                    Course List
                </CardTitle>
                <CardBody className="">
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Larry</td>
                                <td>the Bird</td>
                                <td>@twitter</td>
                            </tr>
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