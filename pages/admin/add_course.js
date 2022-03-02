import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardTitle, Form, FormGroup, Label, Input, Button, CardBody, Table, CardFooter, Pagination, PaginationItem, PaginationLink, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import CustomBreadcrumb from '../../src/components/breadcrumb';


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
        label: "Add course"
    }

]

function AddCourse() {
    const [createCourse, setCreateCourse] = useState({
        courseCode: '',
        courseName: '',
        courseCredit: ''
    });
    const [refetch, setRefetch] = useState(false);
    const [edit, setEdit] = useState(false);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get('/api/admin/course').then(res => {
            setCourses(res.data);
        })
            .catch(err => {
                console.log(err);
            })
    }, [refetch])
    function handleSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
        console.log(createCourse);
        axios.post('/api/admin/course', createCourse)
            .then((res) => {
                console.log(res);
                setCreateCourse({
                    courseCode: '',
                    courseName: '',
                    courseCredit: ''
                });
                setRefetch(!refetch);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleUpdateSubmit(e) {
        e.preventDefault();
        console.log("Form submitted");
        console.log(createCourse);
        axios.patch('/api/admin/course/' + createCourse.courseCode, createCourse)
            .then((res) => {
                console.log(res);
                setCreateCourse({
                    courseCode: '',
                    courseName: '',
                    courseCredit: ''
                });
                setRefetch(!refetch);
                setEdit(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setCreateCourse({
            ...createCourse,
            [name]: value,
        });
    }
    const editCourse = (course) => {
        setCreateCourse({
            courseCode: course.courseCode,
            courseName: course.courseName,
            courseCredit: course.courseCredit
        });
        setEdit(true);
    }
    const deleteCourse = (courseCode) => {
        axios.delete('/api/admin/course/' + courseCode).then(res => {
            console.log(res);
            setRefetch(!refetch);
        })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div>
            <CustomBreadcrumb
                items={breadcrumbConfig}
            />
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-bell me-2"> </i>
                    Add Course
                </CardTitle>
                <CardBody>
                    <Form className='' onSubmit={edit ? handleUpdateSubmit : handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="courseCode">Course Code</Label>
                                    <Input
                                        id="courseCode"
                                        name="courseCode"
                                        placeholder="Course Code"
                                        type="text"
                                        value={createCourse.courseCode}
                                        onChange={handleChange}
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
                                        value={createCourse.courseName}
                                        onChange={handleChange}
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
                                        value={createCourse.courseCredit}
                                        onChange={handleChange}
                                    />
                                </FormGroup>

                            </Col>
                        </Row>
                        <Button className='float-end' type="submit">{edit ? "Edit" : "Submit"}</Button>
                    </Form>
                </CardBody>
            </Card>
            <Card>
                <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <Row>
                        <Col>
                            <i className="bi bi-card-text me-2"> </i>
                            Course List
                        </Col>
                        <Col>
                        </Col>
                        <Col>
                            <Input
                                placeholder='Type to Search'
                            />
                        </Col>
                    </Row>
                </CardTitle>
                <CardBody className="">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Course Credit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={index}>
                                    <td>{course.courseCode}</td>
                                    <td>{course.courseName}</td>
                                    <td>{course.courseCredit}</td>
                                    <td>
                                        <Button
                                            className='rounded-pill mx-2'
                                            onClick={() => editCourse(course)}>
                                            <i className="bi bi-pen"></i>
                                        </Button>
                                        <Button
                                            className='rounded-pill'
                                            onClick={() => deleteCourse(course.courseCode)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
                {/* <CardFooter>
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
                </CardFooter> */}
            </Card>
        </div>
    )
}

export default AddCourse