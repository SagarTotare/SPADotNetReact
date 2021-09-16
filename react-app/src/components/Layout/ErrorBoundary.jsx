import React from "react";
import apiService from "../../services/api.service";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.apiService = apiService;
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.apiService.logError(error, info);
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went Wrong :(</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
