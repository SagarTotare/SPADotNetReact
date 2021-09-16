import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Login/register";
import Login from "./components/Login/login";
import HomepageLayout from "./components/Layout/home";
import classComponent from "./components/LifeCycle/classComponent";
import FunctionalComponent from "./components/LifeCycle/functionalCompponent";
import Table from "./components/LifeCycle/reactTable";
import ErrorBoundary from "./components/Layout/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={HomepageLayout} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/class" component={classComponent} />
          <Route exact path="/functional" component={FunctionalComponent} />
          <Route exact path="/table" component={Table} />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
