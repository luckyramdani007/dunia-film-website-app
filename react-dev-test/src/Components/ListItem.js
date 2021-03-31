import React, { Component } from 'react';
import { Button } from "reactstrap";

export default class ListItem extends Component {
  render() {
    return (
      <div className="p-col-11 ml-5 mt-1 shadow p-3 mb-5 bg-white rounded"
        onClick={() => this.props.openDetails(this.props.data.imdbID)}
      >
        <div className="product-list-item">
          <img
            src={
              this.props.data.Poster == "N/A" ? require("../images/film.png") : this.props.data.Poster
            }
            alt={this.props.data.Title}
          />
          <div className="product-list-detail">
            <div className="product-name">{this.props.data.Title}</div>
            <div className="product-description">{this.props.data.Type}</div>
          </div>
          <Button className="bg-primary" onClick={() => this.props.openDetails(this.props.data.imdbID)}>View Detail</Button>
        </div>
      </div>
    )
  }
}
