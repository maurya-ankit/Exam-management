import axios from 'axios';
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
  Row
} from 'reactstrap';
import StudentList from '../../../src/components/admin/student/studentList';
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
    label: 'Students'
  }
];

// yearoptions from 2016 till current year
// program options B.Tech, BCA, BBA, M.Tech, MCA, MBA

const yearOptions = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let i = 2016; i <= currentYear; i++) {
    yearOptions.push(i);
  }
  return yearOptions;
};

const programOptions = ['B.Tech', 'M.Tech'];

const branchOptions = ['CSE', 'ECE'];

function Index() {
  const [refetch, setRefetch] = useState(false);
  const [edit, setEdit] = useState(false);
  const [filter, setFilter] = useState({
    yearOfAdmission: '2018',
    program: 'B.Tech',
    branch: 'CSE'
  });
  const [registerStudent, setRegisterStudent] = useState({
    MIS: '',
    name: '',
    email: ''
  });

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/admin/student', { ...filter, ...registerStudent })
      .then(res => {
        setRefetch(!refetch);
        console.log(res);
        setRegisterStudent({
          MIS: '',
          name: '',
          email: ''
        });
      })
      .catch(err => console.log(err));
  }

  function handleEdit(e) {
    e.preventDefault();
    axios
      .patch(`/api/admin/student/${registerStudent.MIS}`, {
        ...filter,
        ...registerStudent
      })
      .then(res => {
        setRefetch(!refetch);
        console.log(res);
        setRegisterStudent({
          MIS: '',
          name: '',
          email: ''
        });
        setEdit(false);
      })
      .catch(err => console.log(err));
  }

  function handleOnFilterChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    });
  }

  function handleOnRegisterStudentChange(e) {
    setRegisterStudent({
      ...registerStudent,
      [e.target.name]: e.target.value
    });
  }
  const reset = () => {
    setRegisterStudent({
      MIS: '',
      name: '',
      email: ''
    });
    setEdit(false);
  };

  return (
    <div>
      <CustomBreadcrumb items={breadcrumbConfig} />
      <Card>
        <CardHeader>Filter</CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label for="yearOfAdmission">Year of Admission</Label>
                <Input
                  id="yearOfAdmission"
                  name="yearOfAdmission"
                  placeholder="Year of Admission"
                  type="select"
                  value={filter.yearOfAdmission}
                  onChange={handleOnFilterChange}
                >
                  {yearOptions().map(year => {
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="program">Program</Label>
                <Input
                  id="program"
                  name="program"
                  placeholder="Program"
                  type="select"
                  value={filter.program}
                  onChange={handleOnFilterChange}
                >
                  {programOptions.map(program => {
                    return (
                      <option key={program} value={program}>
                        {program}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="branch">Branch</Label>
                <Input
                  id="branch"
                  name="branch"
                  placeholder="Branch"
                  type="select"
                  value={filter.branch}
                  onChange={handleOnFilterChange}
                >
                  {branchOptions.map(branch => {
                    return (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    );
                  })}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>Register Student</CardHeader>
        <CardBody>
          <Form onSubmit={edit ? handleEdit : handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="MIS">MIS</Label>
                  <Input
                    id="MIS"
                    name="MIS"
                    placeholder="MIS"
                    type="text"
                    value={registerStudent.MIS}
                    onChange={handleOnRegisterStudentChange}
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
                    value={registerStudent.name}
                    onChange={handleOnRegisterStudentChange}
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
                    value={registerStudent.email}
                    onChange={handleOnRegisterStudentChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <div className="float-end">
              <Button type="reset" className="mx-2" onClick={reset}>
                Clear
              </Button>
              <Button type="submit">{edit ? 'Edit' : 'Submit'}</Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <StudentList
        {...filter}
        {...{ setRefetch, refetch, setRegisterStudent, setEdit }}
      />
    </div>
  );
}

export default Index;
