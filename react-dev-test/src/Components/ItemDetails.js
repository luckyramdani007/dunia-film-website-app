import React, { Component } from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Form from "react-bootstrap/Form";
export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      didMount: false,
    };
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.selectedFilmId !== this.props.selectedFilmId) {
      fetch(
        `http://www.omdbapi.com/?i=${this.props.selectedFilmId}&apikey=faf7e5bb`
      )
        .then((resp) => resp)
        .then((resp) => resp.json())
        .then((response) => {
          this.setState({
            selectedFilm: response,
            didMount: true,
          });
        });
    }
  };
  render() {
    return (
      <>
        {this.state.didMount ? (
          <Modal className="shadow p-3 mb-5 bg-white rounded" isOpen={this.props.itemDetailsIsOpen}>
            <ModalHeader> {this.state.selectedFilm.Title} </ModalHeader>
            <ModalBody>
              <Form.Group controlId="exampleForm.ControlInput1">
                <div
                  className="product-grid-item-content"
                  style={{
                    marginLeft:
                      this.state.selectedFilm.Poster == "N/A" ? "-5%" : "20%",

                  }}
                >
                  <img
                    src={
                      this.state.selectedFilm.Poster == "N/A"
                        ? require("../images/film.png")
                        : this.state.selectedFilm.Poster
                    }
                    style={{
                      width: "70%",
                      height: "80%"
                    }}
                    alt={this.state.selectedFilm.Title}
                  />
                </div>
              </Form.Group>
              <Form.Label>
                {" "}
                  Actors : {this.state.selectedFilm.Actors}
              </Form.Label>
              <Form.Label>
                {" "}
                  Awards : {this.state.selectedFilm.Awards}
              </Form.Label>
              <Form.Label>
                {" "}
                  Country : {this.state.selectedFilm.Country}
              </Form.Label>
              <Form.Label>
                {" "}
                  Language : {this.state.selectedFilm.Language}
              </Form.Label>
              <Form.Label>
                {" "}
                  Runtime : {this.state.selectedFilm.Runtime}
              </Form.Label>
            </ModalBody>
            <ModalFooter>
              <Button className="bg-danger" onClick={this.props.close_details}>Kembali</Button>
            </ModalFooter>
          </Modal>
        ) : (
            ""
          )}
      </>
    );
  }
}
