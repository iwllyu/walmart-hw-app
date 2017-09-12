import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Results from "./components/Results";
import Details from "./components/Details";
import { multipleIpodResults } from "./components/Results/tests/mockData";
import { productLookup } from "./components/Details/tests/mockData";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: multipleIpodResults,
      selectedItem: null
    };
  }
  handleSubmit = (e, inputQuery) => {
    e.preventDefault();
    return this.props.walmartApi
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

  handleSelectItem = itemId => {
    if (itemId != null) {
      this.props.walmartApi.queryProductLookup(itemId).then(result => {
        this.setState({ selectedItem: result });
      });
    }
    // TODO remove me when finished with mocks
    // this.setState({ selectedItem: productLookup });
  };

  handleClearSelectedItem = () => {
    this.setState({ selectedItem: null });
  };

  render() {
    return (
      <div>
        <Header onSubmit={this.handleSubmit} />;
        <Results
          results={this.state.results}
          onSelect={this.handleSelectItem}
        />;
        <Details
          item={this.state.selectedItem}
          onClearSelect={this.handleClearSelectedItem}
        />;
        <footer>Walmart Homework Assignment by William Yu</footer>
      </div>
    );
  }
}

App.propTypes = {
  walmartApi: PropTypes.object.isRequired
};

export default App;
