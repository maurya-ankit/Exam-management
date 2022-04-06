import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Table
} from 'reactstrap';

function Users() {
  const [formData, setFormData] = useState({
    role: 'faculty',
    name: '',
    email: ''
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('/api/admin/users', {
        params: {
          role: formData.role
        }
      })
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [formData.role]);

  const handleSubmit = () => {
    console.log(formData);
    axios
      .post('/api/admin/users', formData)
      .then(res => {
        setUsers([...users, formData]);
        setFormData({
          role: 'faculty',
          name: '',
          email: ''
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <React.Fragment>
      <Card>
        <CardHeader>Add/Edit user</CardHeader>
        <CardBody>
          <Row>
            <Col>
              <FormGroup>
                <Label for="Role">Role</Label>
                <Input
                  id="Role"
                  name="role"
                  placeholder="Role"
                  type="select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value={'faculty'}>Faculty</option>
                  <option value={'admin'}>Admin</option>
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Name">Name</Label>
                <Input
                  id="Name"
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input
                  id="Email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          {/* cancel and save button */}
          <div className="float-end">
            <Button type="reset" className="mx-2 bg-danger">
              Clear
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Row>
            <Col>Users</Col>
            <Col>
              <FormGroup>
                <Input
                  id="Role"
                  name="role"
                  placeholder="Role"
                  type="select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value={'faculty'}>Faculty</option>
                  <option value={'admin'}>Admin</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table borderless>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default Users;
