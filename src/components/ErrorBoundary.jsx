import React, { Component } from "react";
import { themColors } from "../app/constants";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.log("loggin", error, errorInfo);
  }
  render() {
    return this.state.hasError ? (
      <h1 style={{ color: themColors.basic }}>Something went wrong!</h1>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
