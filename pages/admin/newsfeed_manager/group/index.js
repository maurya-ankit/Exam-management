import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
import databaseConnect from '../../../../lib/databaseConnect';
import Group from '../../../../models/group';
import Students from '../../../../models/students';

import CustomBreadcrumb from '../../../../src/components/breadcrumb';
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
        label: 'News Feed',
        link: '/admin/newsfeed_manager'
    },
    {
        label: 'Group'
    }
];

// yearoptions from 2016 till current year
// program options B.Tech, BCA, BBA, M.Tech, MCA, MBA

const programOptions = ['B.Tech', 'M.Tech'];

const branchOptions = ['CSE', 'ECE'];

function Index({ students, groups }) {
    // const optionList = [
    //     { value: "red", label: "Red" },
    //     { value: "green", label: "Green" },
    //     { value: "yellow", label: "Yellow" },
    //     { value: "blue", label: "Blue" },
    //     { value: "white", label: "White" }
    // ];
    const [optionList, setOptionList] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        emails: []
    });
    useEffect(() => {
        setOptionList(students.map((ele) => { return { 'value': ele.email, 'label': `${ele.name} (${ele.email})` } }))
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            name: formData.name,
            emails: formData.emails.map(element => element.value)
        }
        axios.post('/api/admin/group', data).then(
            res => {
                console.log(res)
            }
        ).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <CustomBreadcrumb items={breadcrumbConfig} />
            {/* card with form to create group */}
            <Card>
                <CardHeader>
                    Add new Group
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Group Name</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} required type="text" id="name" name="name" placeholder="group name" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="text-input">Members</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Select
                                    options={optionList}
                                    value={formData.emails}
                                    onChange={(data) => setFormData(prev => ({ ...prev, emails: data }))}
                                    placeholder="Select members"
                                    isMulti
                                    isSearchable
                                />
                            </Col>
                        </FormGroup>

                        <Button>
                            Submit
                        </Button>
                    </Form>
                </CardBody>
            </Card>

            <Table hover>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Group Name
                        </th>
                        <th>
                            no of members
                        </th>
                        <th>
                            Edit Group
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((ele, index) => (<tr>
                        <th scope="row">
                            {index + 1}
                        </th>
                        <td>
                            {ele.name}
                        </td>
                        <td>
                            {ele.emails.length}
                        </td>
                        <td>
                            <Button>
                                Edit
                            </Button>
                        </td>
                    </tr>))}

                </tbody>
            </Table>
        </div>
    );
}

export default Index;

export async function getServerSideProps(context) {
    await databaseConnect();
    const students = await Students.find({})
    const groups = await Group.find()
    console.log(groups)
    return {
        props: {
            students: JSON.parse(JSON.stringify(students)),
            groups: JSON.parse(JSON.stringify(groups))
        }, // will be passed to the page component as props
    }
}