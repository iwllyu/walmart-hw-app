import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Results from "./components/Results";
import { multipleIpodResults } from "./components/Results/tests/mockData";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: multipleIpodResults
    };
  }
  handleSubmit = (e, inputQuery) => {
    e.preventDefault();
    return this.props.searchApi
      .querySearch(inputQuery)
      .then(result => {
        this.setState({ results: result.items });
      })
      .catch(error => {
        console.log("err");
        console.log(error);
        // Swallow promise after displaying an error message
        return Promise.resolve();
      });
  };

  render() {
    return (
      <div>
        <Header onSubmit={this.handleSubmit} />;
        <Results results={this.state.results} />;
        <footer>Walmart Homework Assignment by William Yu</footer>
      </div>
    );
  }
}

App.propTypes = {
  searchApi: PropTypes.object.isRequired
};

export default App;
