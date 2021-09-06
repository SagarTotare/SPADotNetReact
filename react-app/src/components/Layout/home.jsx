import React, { Component } from "react";
import {
  Button,
  Container,
  Grid,
  Menu,
  Segment,
  Visibility,
} from "semantic-ui-react";
import StudentsList from "../Student/list";

const HomepageLayout = () => {
  var fixed = null;
  return (
    <Visibility>
      <Segment inverted textAlign="center" vertical>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
        >
          <Container>
            <Menu.Item as="a" active>
              Students
            </Menu.Item>
            <Menu.Item as="a">Users</Menu.Item>
            <Menu.Item position="right">
              <a inverted={!fixed} href="./login">
                Sign In
              </a>
              <a
                inverted={!fixed}
                style={{ marginLeft: "0.5em" }}
                href="./register"
              >
                Sign Up
              </a>
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Segment
        style={{ minHeight: 70, padding: "1em 0em", padding: "8em 0em" }}
        vertical
      >
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <StudentsList />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Visibility>
  );
};

export default HomepageLayout;
