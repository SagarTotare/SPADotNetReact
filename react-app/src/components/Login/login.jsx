import React, { useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import logo from "../../logo.svg";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const postData = () => {
    axios
      .post(`http://localhost:54306/api/user/Login`, { userName, password })
      .then((response) => {
        var tokenString = JSON.stringify(response.data);
        var tokenJson = JSON.parse(tokenString);
        var token = tokenJson['data'];
        console.log(token);
        sessionStorage.setItem("token", token);

        alert(response.data);
        if (
          response.data != "Login Failed: UserName or Password is not Correct"
        ) {
          history.push("/home");
        }
      });
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <img src={logo} className="App-logo" alt="logo" />
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
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
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="./register">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
