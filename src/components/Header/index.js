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
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

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
      <header>
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
                    id="SearchInput"
                    type="text"
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder="Search"
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
      </header>
    );
  }
}

export default Header;
