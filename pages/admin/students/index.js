import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import CustomBreadcrumb from '../../../src/components/breadcrumb'
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
        label: "Students"
    }
]
function Index() {
    return (
        <div>
            <CustomBreadcrumb
                items={breadcrumbConfig}
            />
            <Card>
                <CardHeader>
                    Filter
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="yearOfAdmission">Year of Admission</Label>
                                <Input
                                    id="yearOfAdmission"
                                    name="yearOfAdmission"
                                    placeholder="Year of Admission"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="program">Program</Label>
                                <Input
                                    id="program"
                                    name="program"
                                    placeholder="Program"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="branch">Branch</Label>
                                <Input
                                    id="branch"
                                    name="branch"
                                    placeholder="Branch"
                                    type="text"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    Register Student
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="MIS">MIS</Label>
                                    <Input
                                        id="MIS"
                                        name="MIS"
                                        placeholder="MIS"
                                        type="number"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Name"
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <div className='float-end'>
                            <Button type="reset" className='mx-2'>Clear</Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Index