import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col } from "react-bootstrap";
import * as he from "he";
import "./styles.css";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateResultList = results => {
    return results.reduce((acc, result) => {
      acc.push(this.generateResult(result));
      return acc;
    }, []);
  };

  generateResult = result => {
    let decodedDescription;
    if (result.shortDescription) {
      decodedDescription = he.decode(result.shortDescription);
    }
    return (
      <Row key={result.itemId}>
        <Col xs={12}>
          <div className="name">{result.name}</div>
          <img
            className="thumbnail"
            src={result.thumbnailImage}
            alt={result.name}
          />
          <div className="price">{result.salePrice}</div>
          {decodedDescription ? (
            <div
              className="short-description"
              dangerouslySetInnerHTML={{ __html: decodedDescription }}
            />
          ) : null}
        </Col>
      </Row>
    );
  };

  render() {
    return <Grid>{this.generateResultList(this.props.results)}</Grid>;
  }
}

Results.propTypes = {
  results: PropTypes.array.isRequired
};

export default Results;
