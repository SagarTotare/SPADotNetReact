import React, { useState, useEffect } from "react";
import { Grid, Table, Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import apiService from "../../services/api.service";

const StudentsList = () => {
  const [studentsList, setStudentList] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const history = useHistory();

  const getStudents = () => {
    apiService.get("student/GetStudent").then((response) => {
      setStudentList(response.data);
    });
  };

  const addStudent = () => {
    history.push("/admin/student/add");
  };

  const removeStudent = (e) => {
    const shouldDelete = window.confirm(
      "Are you sure? you want to delete this student?"
    );

    if (shouldDelete) {
      apiService
        .delete(`student/RemoveStudent/${e.currentTarget.value}`)
        .then((response) => {
          alert(response.data);
          getStudents();
        });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="top">
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Button primary size="huge" onClick={addStudent}>
            Add new Student
          </Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Sr.</Table.HeaderCell>
                <Table.HeaderCell>Student Name</Table.HeaderCell>
                <Table.HeaderCell>DOB</Table.HeaderCell>
                <Table.HeaderCell>Height</Table.HeaderCell>
                <Table.HeaderCell>Weight</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {studentsList.map((value, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{value.studentName}</Table.Cell>
                    <Table.Cell>{value.dateOfBirth}</Table.Cell>
                    <Table.Cell>{value.height}</Table.Cell>
                    <Table.Cell>{value.weight}</Table.Cell>
                    <Table.Cell>
                      <a href={"student/add/" + value.studentID}>
                        <Icon circular name="edit" />
                      </a>
                      <Button
                        circular
                        color="twitter"
                        icon="user delete"
                        value={value.studentID}
                        onClick={removeStudent}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default StudentsList;
