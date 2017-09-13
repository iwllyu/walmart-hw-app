import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Results from "./components/Results";
import Details from "./components/Details";
import Recommended from "./components/Recommended";

import "./App.css";

class App extends Component {
  static propTypes = {
    walmartApi: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      results: null,
      selectedItem: null,
      recommendedItems: null
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
        console.log("Error during querySearch: ", error);
        // Swallow promise after displaying an error message
        return Promise.resolve();
      });
  };

  handleSelectItem = itemId => {
    const recommendationPromise = this.props.walmartApi
      .queryRecommendation(itemId)
      .then(result => {
        if (result.errors) {
          return Promise.reject(result.errors);
        }
        this.setState({ recommendedItems: result });
      })
      .catch(error => {
        console.log("Error during queryProductLookup: ", error);
        return Promise.resolve();
      });
    const lookupPromise = this.props.walmartApi
      .queryProductLookup(itemId)
      .then(result => {
        this.setState({ selectedItem: result });
      })
      .catch(error => {
        console.log("Error during queryProductLookup: ", error);
        return Promise.resolve();
      });

    return Promise.all([recommendationPromise, lookupPromise]);
  };

  handleClearSelectedItem = () => {
    this.setState({ selectedItem: null, recommendedItems: null });
  };

  render() {
    return (
      <div className="app-container">
        <Header onSubmit={this.handleSubmit} />
        <Results
          results={this.state.results}
          onSelect={this.handleSelectItem}
        />
        <Details
          item={this.state.selectedItem}
          onClearSelect={this.handleClearSelectedItem}
          recommendedItems={<Recommended items={this.state.recommendedItems} />}
        />
      </div>
    );
  }
}

export default App;
