import React, { Component } from "react";
import Header from "./components/Header";
import Results from "./components/Results";
import { multipleIpodResults } from "./components/Results/tests/mockData";
import SearchApi from "./services/SearchApi";

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
    SearchApi.query(inputQuery)
      .then(result => {
        this.setState({ results: result.items });
      })
      .catch(error => {
        console.log("error");
        console.log(error);
        //error handling
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

export default App;
