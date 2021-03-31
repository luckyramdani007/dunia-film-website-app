import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export default class Footer extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="white" expand="lg" className="fixed-bottom">
        <Nav className="text-center text-white">&copy; Copyright 2021 Dunia Film Website. All Rights Reserved.</Nav>
      </Navbar>
    )
  }
}

