import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Image } from "react-bootstrap";
import * as he from "he";
import "./styles.css";

class Details extends Component {
  static propTypes = {
    item: PropTypes.object,
    onClearSelect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      startClosingModal: false
    };
  }

  handleOnHide = () => {
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
        className="detail-modal"
        show={!this.state.startClosingModal && item != null}
        onHide={this.handleOnHide}
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
                {/*TODO numReviews*/}
              </div>

              <div>
                <Image
                  responsive
                  className="large-image"
                  src={item.largeImage}
                  alt={item.name}
                />
              </div>
              {this.props.recommendedItems}
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
          <Button className="detail-hide" onClick={this.handleOnHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Details;
