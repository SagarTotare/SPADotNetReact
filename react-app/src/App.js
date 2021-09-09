import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Login/register";
import Login from "./components/Login/login";
import HomepageLayout from "./components/Layout/home";
import AddStudent from "./components/Student/add";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={HomepageLayout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/student/add/:id?" component={AddStudent} />
      </div>
    </Router>
  );
}

export default App;
