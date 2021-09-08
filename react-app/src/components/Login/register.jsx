import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import apiService from "../../services/api.service";
import { useHistory } from "react-router-dom";

import logo from "../../logo.svg";

const RegistrationForm = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    apiService
      .post(`user/RegisterUser`, {
        name,
        emailId,
        phoneNo,
        userName,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          alert("Authentication success.");
          localStorage.setItem("user", JSON.stringify(response.data));
          history.push("/login");
        }
      });
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
            <img src={logo} className="App-logo" alt="logo" />
            Add new user account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email ID"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <Form.Input
                fluid
                icon="phone square"
                iconPosition="left"
                placeholder="Phone No"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button color="teal" fluid size="large" onClick={postData}>
                Register
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have account? <a href="./login">Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default RegistrationForm;
