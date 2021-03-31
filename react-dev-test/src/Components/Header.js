import React, { Component } from "react";
import { Navbar, Nav, Form } from "react-bootstrap";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { connect } from "react-redux";
import { storeData } from "../redux";
class Header extends Component {
  constructor(storeData) {
    super();
    this.state = {
      title: "Batman",
      ismounted: false,
    };
  }
  componentDidMount = () => {
    this.setState({
      ismounted: true,
    });
  };
  handleSearch = () => {
    this.props.storeData({ varName: "title", data: this.state.title });
  };
  render() {
    return (
      <div>
        {this.state.ismounted ? (
          <Navbar bg="danger" variant="white" expand="lg" className="fixed-top">
            <Navbar.Brand>
              <h4 className="text-white">DUNIA FILM <i className="pi pi-video lg" style={{ 'fontSize': '100%' }}></i></h4>
            </Navbar.Brand>

            <Nav className="mr-auto"></Nav>
            <Form inline>
              <div style={{ marginLeft: "-10%" }}>
                <InputText
                  value={this.state.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
                />
              </div>
            </Form>
            <Button onClick={this.handleSearch}><i className="pi pi-search"></i></Button>
          </Navbar>
        ) : (
            ""
          )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeData: (data) => dispatch(storeData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);