import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, Button, FormControl } from "react-bootstrap";
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
      <div className="Header">
        <Grid>
          <Row>
            <Col xs={12}>
              <img className="Logo" src={wmBrandWhiteLogo} alt="Walmart Logo" />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <form onSubmit={e => this.props.onSubmit(e, this.state.query)}>
                <FormControl
                  type="text"
                  value={this.state.query}
                  onChange={this.handleChange}
                  placeholder="Enter text"
                />
                <Button type="submit">Submit</Button>
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
