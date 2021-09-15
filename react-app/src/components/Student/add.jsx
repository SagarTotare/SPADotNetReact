import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { useHistory } from "react-router-dom";
import apiService from "../../services/api.service";

const AddStudent = (props) => {
  const [errors, setErrors] = useState({});
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
      apiService.get(`student/GetStudent/${id}`).then((response) => {
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

  const saveData = () => {
    if (!validateForm()) {
      return true;
    }
    if (studentId) {
      apiService
        .put(`student/UpdateStudent/${studentId}`, {
          studentName,
          dateOfBirth,
          height,
          weight,
        })
        .then((response) => {
          alert(response.data);
          history.push("/admin/student");
        });
    } else {
      apiService
        .post(`student/AddStudent`, {
          studentName,
          dateOfBirth,
          height,
          weight,
        })
        .then((response) => {
          alert(response.data);
          history.push("/admin/student");
        });
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    if (!studentName) {
      isFormValid = false;
      errors["studentName"] = {
        error: {
          content: "Please enter student name",
          pointing: "below",
        },
      };
    } else {
      delete errors["studentName"];
    }

    if (!dateOfBirth) {
      isFormValid = false;
    } else {
      delete errors["dateOfBirth"];
    }

    if (!height) {
      isFormValid = false;
      errors["height"] = {
        error: {
          content: "Please enter Height",
          pointing: "below",
        },
      };
    } else {
      delete errors["height"];
    }

    if (!weight) {
      isFormValid = false;
      errors["weight"] = {
        error: {
          content: "Please enter weight",
          pointing: "below",
        },
      };
    } else {
      delete errors["weight"];
    }

    if (!isFormValid) {
      setErrors({ ...errors });
    }
    return isFormValid;
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
            {studentId ? "Edit " : "Add new"} student
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                {...errors.studentName}
                placeholder="First name"
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Student Name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <SemanticDatepicker
                {...errors.dateOfBirth}
                value={dateOfBirth}
                onChange={onChangeDOB}
              />
              <Form.Input
                {...errors.height}
                fluid
                icon="text height"
                iconPosition="left"
                placeholder="Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <Form.Input
                {...errors.weight}
                fluid
                icon="weight"
                iconPosition="left"
                placeholder="Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <Button color="teal" fluid size="large" onClick={saveData}>
                {studentId ? "Edit " : "Add "} Student
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AddStudent;
