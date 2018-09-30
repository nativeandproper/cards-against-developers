import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };
  render() {
    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
      </div>
    );
  }
}
