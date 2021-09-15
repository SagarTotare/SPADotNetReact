import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hello: "World!" };
    this.forceUpdateState = this.forceUpdateState.bind(this);
    console.log("constructor");
  }

  componentWillMount() {
    console.log("componentWillMount()");
  }

  componentDidMount() {
    console.log("componentDidMount()");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate()", nextProps, nextState);

    return true;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate()");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate()");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount()");
  }

  changeState() {
    this.setState({ hello: "react!" });
  }

  forceUpdateState() {
    this.forceUpdate();
  }

  changeColor() {
    const element = document.getElementById("myCustomButton");
    ReactDOM.findDOMNode(element).style.color = "red";
  }

  render() {
    console.log("render");
    return (
      <div>
        <h1>
          {this.props.sayHello} {this.state.hello}
        </h1>
        <h2>
          <a onClick={this.changeState.bind(this)}>Press Here!</a>
        </h2>
        <button onClick={this.forceUpdateState}>ForceUpdate</button>
        <div id="myCustomButton" onClick={this.changeColor.bind(this)}>
          My Custom text to change style
        </div>
      </div>
    );
  }
}

// property validation
ClassComponent.propTypes = {
  sayHello: PropTypes.string.isRequired,
};

// pass default props
ClassComponent.defaultProps = {
  sayHello: "Hello ",
};

export default ClassComponent;
