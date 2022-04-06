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

const studentsData = [
  {
    MIS: '1',
    name: 'Ankit',
    email: 'ankit@cse.iiitp.ac.in'
  },
  {
    MIS: '2',
    name: 'Ashish',
    email: 'ashish@cse.iiitp.ac.in'
  },
  {
    MIS: '3',
    name: 'Sachin',
    email: 'sachin@cse.iiitp.ac.in'
  }
];

function StudentList(props) {
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
  } = props;
  useEffect(() => {
    const params = {
      yearOfAdmission,
      program,
      branch
    };
    axios
      .get('/api/admin/student', { params })
      .then(res => {
        // sort by MIS
        const sortedStudents = res.data.sort((a, b) => a.MIS - b.MIS);
        setStudents(sortedStudents);
      })
      .catch(err => {
        console.log(err);
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
      .then(res => {
        setRefetch(!refetch);
      })
      .catch(err => {
        console.log(err);
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
              onChange={e => setSearch(e.target.value)}
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
