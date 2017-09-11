import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Glyphicon,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup
} from "react-bootstrap";
import "./styles.css";
import wmBrandWhiteLogo from "./walmart-brand.svg";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <div className="header">
        <Grid>
          <Row>
            <Col xs={12} className="header-content">
              <div className="logo">
                <img src={wmBrandWhiteLogo} alt="Walmart Logo" />
              </div>
              <form
                className="query-form"
                onSubmit={e => this.props.onSubmit(e, this.state.query)}
              >
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Enter text"
                  />
                  <InputGroup.Button>
                    <Button type="submit">
                      <Glyphicon glyph="search" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Header.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Header;
