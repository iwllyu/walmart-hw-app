import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Recommended extends Component {
  static propTypes = {
    items: PropTypes.array
  };

  generateCell = item => {
    return (
      <div className="recommendation-cell" key={item.itemId}>
        <div className="recommendation-thumbnail">
          <img src={item.thumbnailImage} alt={item.name} />
          <div className="recommendation-price">${item.salePrice}</div>
        </div>
        <div className="recommendation-name">{item.name}</div>
      </div>
    );
  };

  render() {
    if (this.props.items) {
      return (
        <div className="recommendation-section">
          <div className="recommendation-header">Customers also considered</div>
          <div className="recommendation-list">
            {this.props.items.map(item => this.generateCell(item))}
          </div>
        </div>
      );
    }

    return null;
  }
}

export default Recommended;
