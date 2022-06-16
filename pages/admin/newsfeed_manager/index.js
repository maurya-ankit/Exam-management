import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import {
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
import databaseConnect from '../../../lib/databaseConnect';
import Group from '../../../models/group';

import CustomBreadcrumb from '../../../src/components/breadcrumb';
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
        label: 'News Feed'
    }
];

// yearoptions from 2016 till current year
// program options B.Tech, BCA, BBA, M.Tech, MCA, MBA

const programOptions = ['B.Tech', 'M.Tech'];

const branchOptions = ['CSE', 'ECE'];

function Index({ groups }) {

    return (
        <div>
            <CustomBreadcrumb items={breadcrumbConfig} />
            {/* mail sender admin page with multiple group to be selected from options  */}
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <strong>News Feed</strong>
                        </CardHeader>
                        <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Title</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="text" id="text-input" name="text-input" placeholder="Title" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Description</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="textarea" id="text-input" name="text-input" placeholder="Description" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Image</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input type="file" id="text-input" name="text-input" placeholder="Image" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Group</Label>
                                    </Col>
                                    <Col >
                                        <Input type="select" id="text-input" name="text-input" placeholder="Year">

                                            {groups.map(element => (<option>{element.name}</option>))}
                                        </Input>
                                    </Col>
                                    <Col >
                                        <Link href={`/admin/newsfeed_manager/group`} >Add/Edit Group</Link>
                                    </Col>
                                </FormGroup>
                                <Button>
                                    Post
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            {/* list of all previously sent mails with pagination and link to detailed page*/}
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <strong>previously posted newsfeed</strong>
                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Image</th>
                                        <th>Link</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Year</th>
                                        <th>Program</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                        <td>Mark</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Index;

export async function getServerSideProps(context) {
    await databaseConnect();
    const groups = await Group.find()
    return {
        props: {
            groups: JSON.parse(JSON.stringify(groups))
        }, // will be passed to the page component as props
    }
}