import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
  Table
} from 'reactstrap';

function StudentList(properties) {
  const [search, setSearch] = useState('');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const {
    yearOfAdmission,
    program,
    branch,
    refetch,
    setRegisterStudent,
    setEdit,
    setRefetch
  } = properties;
  useEffect(() => {
    const parameters = {
      yearOfAdmission,
      program,
      branch
    };
    axios
      .get('/api/admin/student', { params: parameters })
      .then(response => {
        // sort by MIS
        const sortedStudents = response.data.sort((a, b) => a.MIS - b.MIS);
        setStudents(sortedStudents);
      })
      .catch(error => {
        console.log(error);
      });
  }, [branch, program, yearOfAdmission, refetch]);
  useEffect(() => {
    if (search !== '') {
      const fStudents = students.filter(student => {
        return `${student.name} ${student.MIS} ${student.email}`
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setFilteredStudents(fStudents);
    } else {
      setFilteredStudents(students);
    }
  }, [search, students]);
  const editStudent = student => {
    setRegisterStudent({
      MIS: student.MIS,
      name: student.name,
      email: student.email
    });
    setEdit(true);
  };
  function deleteStudent(MIS) {
    axios
      .delete(`/api/admin/student/${MIS}`)
      .then(() => {
        setRefetch(!refetch);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>Students List</Col>
          <Col></Col>
          <Col>
            <Input
              onChange={event_ => setSearch(event_.target.value)}
              value={search}
              placeholder="Search"
            />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Table striped>
          <thead>
            <tr>
              <th>MIS</th>
              <th>Student Name</th>
              <th>I-Mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.MIS}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Button
                    className="rounded-pill mx-2"
                    onClick={() => editStudent(student)}
                  >
                    <i className="bi bi-pen"></i>
                  </Button>
                  <Button
                    className="rounded-pill"
                    onClick={() => deleteStudent(student.MIS)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default StudentList;
