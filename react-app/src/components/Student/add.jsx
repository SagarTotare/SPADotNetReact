import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddStudent = (props) => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const onChangeDOB = (event, data) => setDateOfBirth(data.value);

  useEffect(() => {
    initStudent();
  }, []);

  const history = useHistory();

  const initStudent = () => {
    const { id } = props.match.params;
    if (id) {
      axios
        .get(`http://localhost:54306/api/student/GetStudent/${id}`)
        .then((response) => {
          const { studentID, studentName, dateOfBirth, height, weight } =
            response.data;
          setStudentId(studentID);
          setStudentName(studentName);
          setHeight(height);
          setWeight(weight);
          setDateOfBirth(new Date(dateOfBirth));
        });
    }
  };

  const postData = () => {
    debugger;
    if (studentId) {
      axios
        .put(`http://localhost:54306/api/student/UpdateStudent/${studentId}`, {
          studentName,
          dateOfBirth,
          height,
          weight,
        })
        .then((response) => {
          alert(response.data);
          history.push("/");
        });
    } else {
      axios
        .post(`http://localhost:54306/api/student/AddStudent`, {
          studentName,
          dateOfBirth,
          height,
          weight,
        })
        .then((response) => {
          alert(response.data);
          history.push("/");
        });
    }
  };

  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Add new student
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <SemanticDatepicker value={dateOfBirth} onChange={onChangeDOB} />
              <Form.Input
                fluid
                icon="text height"
                iconPosition="left"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <Form.Input
                fluid
                icon="weight"
                iconPosition="left"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button color="teal" fluid size="large" onClick={postData}>
                Add Student
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AddStudent;
