import React, { Component } from 'react'

export default class GridItem extends Component {
  render() {
    return (
      <div className="p-col-12 p-md-3"
        onClick={() => this.props.openDetails(this.props.data.imdbID)}
      >
        <div className="product-grid-item-top">
          <div>
          </div>
        </div>
        <div className="product-grid-item card shadow p-3 mb-5 bg-white rounded">
          <div className="product-grid-item-content">
            <img
              src={
                this.props.data.Poster == "N/A"
                  ? require("../images/film.png")
                  : this.props.data.Poster
              }
              alt={this.props.data.Title}
            />
            <div className="product-name">{this.props.data.Title}</div>
            <div className="product-description">{this.props.data.Year}</div>
          </div>
        </div>
      </div>
    )
  }
}
