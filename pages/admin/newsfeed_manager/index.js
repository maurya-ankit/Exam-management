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
import Newsfeed from '../../../models/newsfeed';
import Group from '../../../models/group';
import ReactMarkdown from "react-markdown";

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

function Index({ newsfeed, groups }) {
    const [newsFeed, setNewsFeed] = useState(newsfeed || [])
    const initFormData = {
        title: "",
        description: "",
        group: "",
        seen: [],
        postedAt: "",
        comments: [],
        slug: []
    }
    const [formData, setFormData] = useState(initFormData)
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...formData }
        data.postedAt = new Date().toLocaleString();
        console.log(data)
        axios.post('/api/admin/newsfeed', data)
            .then(res => {
                console.log(res.data);
                setFormData(prev => ({ ...prev, ...initFormData }))
                axios.get('/api/admin/newsfeed')
                    .then(res => {
                        setNewsFeed(res.data);
                    })
                    .catch(() => {

                    })
            })
            .catch(err => {
                console.log(err);
            }
            )
    }
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
                            <Form onSubmit={handleSubmit} className="form-horizontal">
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Title</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} type="text" id="text-input" name="text-input" placeholder="Title" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Description</Label>
                                    </Col>
                                    <Col xs="12" md="9">
                                        <Input onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} type="textarea" id="text-input" name="text-input" placeholder="Description" />
                                    </Col>
                                </FormGroup>
                                <ReactMarkdown>{formData.description}</ReactMarkdown>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="text-input">Group</Label>
                                    </Col>
                                    <Col >
                                        <Input onChange={(e) => setFormData(prev => ({ ...prev, group: e.target.value }))} type="select" id="text-input" name="text-input" placeholder="Year">

                                            {groups.map(element => (<option>{element.name}</option>))}
                                        </Input>
                                    </Col>
                                    <Col >
                                        <Link href={`/admin/newsfeed_manager/group`} >Add/Edit Group</Link>
                                    </Col>
                                </FormGroup>
                                <Button type='submit'>
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
                                        <th>Posted At</th>
                                        <th>Group</th>
                                        <th>Navigation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsFeed.reverse().map((data) => (<tr>
                                        <td>{data.title}</td>
                                        <td>{data.postedAt}</td>
                                        <td>{data.group}</td>
                                        <td><Link href={`/admin/newsfeed_manager/${data._id}`}>Go to details</Link></td>
                                    </tr>))}
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
    const newsfeed = await Newsfeed.find();
    const groups = await Group.find();
    return {
        props: {
            newsfeed: JSON.parse(JSON.stringify(newsfeed)),
            groups: JSON.parse(JSON.stringify(groups))
        }, // will be passed to the page component as props
    }
}