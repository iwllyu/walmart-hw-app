import React, { Component } from "react";
import PropTypes from "prop-types";
import { Clearfix, Grid, Row, Col } from "react-bootstrap";
import * as he from "he";
import "./styles.css";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  generateResultList = results => {
    return results.reduce((acc, result, index) => {
      if (index !== 0 && index % 2 === 0) {
        acc.push(
          <Clearfix
            visibleSmBlock
            visibleMdBlock
            visibleLgBlock={index % 4 === 0}
          />
        );
      }
      acc.push(this.generateResult(result));
      return acc;
    }, []);
  };

  generateResult = result => {
    let decodedDescription;
    if (result.shortDescription) {
      decodedDescription = he.decode(result.shortDescription);
    } else if (result.longDescription) {
      decodedDescription = he.decode(result.longDescription);
    }
    return (
      <Col className="product-cell" key={result.itemId} xs={12} sm={6} lg={3}>
        <img
          className="thumbnail"
          src={result.thumbnailImage}
          alt={result.name}
        />
        <div className="name">{result.name}</div>
        <div className="price">${result.salePrice}</div>
        {decodedDescription && (
          <div
            className="short-description"
            dangerouslySetInnerHTML={{ __html: decodedDescription }}
          />
        )}
      </Col>
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
