import React, { useEffect, Suspense, lazy } from "react";
import {
  Container,
  Grid,
  Menu,
  Segment,
  Visibility,
  Button,
} from "semantic-ui-react";
import apiService from "../../services/api.service";
import { useHistory } from "react-router-dom";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

// lazy loading
const AddStudent = lazy(() => import("../Student/add"));
const StudentsList = lazy(() => import("../Student/list"));

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

const HomepageLayout = () => {
  var fixed = null;
  let isLoggedIn = false;
  const history = useHistory();

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = () => {
    isLoggedIn = apiService.isUserLoggedIn();
    if (!isLoggedIn) {
      history.push("/");
    }
  };

  const logOut = () => {
    apiService.logOut();
    isUserLoggedIn();
  };

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
            <Menu.Item>
              <NavLink to="/admin/student" activeStyle={{ color: "green" }}>
                Students
              </NavLink>
            </Menu.Item>
            <Menu.Item>
              <NavLink to="/admin/users" activeStyle={{ color: "green" }}>
                Users
              </NavLink>
            </Menu.Item>
            <Menu.Item position="right">
              <Button onClick={logOut} inverted={!fixed}>
                Log Out
              </Button>
              {/* <a
                inverted={!fixed}
                style={{ marginLeft: "0.5em" }}
                href="./register"
              >
                Sign Out
              </a> */}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      <Segment style={{ minHeight: 70, padding: "1em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  {/* todo: after adding dashboard remove default redirection */}
                  <Route exact path="/admin">
                    <Redirect to="/admin/student" />
                  </Route>
                  <Route exact path="/admin/student" component={StudentsList} />
                  <Route
                    path="/admin/student/add/:id?"
                    component={AddStudent}
                  />
                  <Route component={NotFound} />
                </Switch>
              </Suspense>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Visibility>
  );
};

export default HomepageLayout;
