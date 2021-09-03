import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./components/Login/register";
import Login from "./components/Login/login";

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
