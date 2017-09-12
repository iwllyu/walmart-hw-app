import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Grid, Row, Col, Image } from "react-bootstrap";
import * as he from "he";
import "./styles.css";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      startClosingModal: false
    };
  }

  handleClose = () => {
    this.setState({ startClosingModal: true });
  };

  handleOnExited = () => {
    this.props.onClearSelect();
    this.setState({ startClosingModal: false });
  };

  render() {
    const item = this.props.item;
    let shortDecodedDesc;
    let longDecodedDesc;
    if (item) {
      if (item.shortDescription) {
        shortDecodedDesc = he.decode(item.shortDescription);
      }
      if (item.longDescription) {
        longDecodedDesc = he.decode(item.longDescription);
      }
    }

    return (
      <Modal
        show={!this.state.startClosingModal && item != null}
        onHide={this.handleClose}
        onExited={this.handleOnExited}
        bsSize="large"
      >
        <Modal.Body>
          {item && (
            <div>
              <h1 className="detail-name">{item.name}</h1>
              <div className="price">${item.salePrice}</div>
              <div>
                <img
                  className="rating"
                  src={item.customerRatingImage}
                  alt="rating"
                />
              </div>

              <div>
                <Image
                  responsive
                  className="large-image"
                  src={item.largeImage}
                  alt={item.name}
                />
              </div>

              <h3>About The Item</h3>
              {shortDecodedDesc && (
                <div
                  className="detail-short-description"
                  dangerouslySetInnerHTML={{ __html: shortDecodedDesc }}
                />
              )}
              {longDecodedDesc && (
                <div
                  className="detail-long-description"
                  dangerouslySetInnerHTML={{ __html: longDecodedDesc }}
                />
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

Details.propTypes = {
  item: PropTypes.object,
  onClearSelect: PropTypes.func.isRequired
};

export default Details;
