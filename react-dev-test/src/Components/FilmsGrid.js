import React, { Component } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import GridItem from "./GridItem";
import ListItem from "./ListItem";
import ItemDetails from "./ItemDetails";

export default class FilmsGrid extends Component {
  constructor() {
    super();
    this.state = {
      products: null,
      layout: "grid",
      loading: true,
      first: 0,
      totalRecords: 0,
      itemDetailsIsOpen: false,
    };
    this.rows = 12;

    this.itemTemplate = this.itemTemplate.bind(this);
    this.onPage = this.onPage.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.fetchData(1);
    }, 1000);
  }
  componentDidUpdate(prevProps) {

    if (
      prevProps.title !== this.props.title ||
      prevProps.year !== this.props.year ||
      prevProps.searchType !== this.props.searchType
    ) {

      setTimeout(() => {
        this.fetchData(1);
      }, 1000);
    }
  }
  fetchData = (pageNumber) => {
    return fetch(
      `http://www.omdbapi.com/?s=${this.props.title}&apikey=faf7e5bb&page=${pageNumber}`
    )
      .then((resp) => resp)
      .then((resp) => resp.json())
      .then((response) => {

        if (response.totalRecords < 10) {
          console.log("total", response.totalRecords)
          this.rows = response.totalRecordes;
        } else {
          this.rows = 12;
          this.datasource = response.Search;
          this.setState({
            totalRecords: Number(response.totalResults),
            products: this.datasource,
            loading: false,
          });
        }
      });
  };

  // film details
  openDetails = (filmId) => {

    this.setState({
      itemDetailsIsOpen: true,
      selectedFilmId: filmId,
    });
  };
  close_details = () => {
    this.setState({
      itemDetailsIsOpen: false,
    });
  };
  ///pagination controls
  onPage(event) {
    this.setState({
      first: event.first,
    });

    this.fetchData(event.first / this.rows + 1);
  }
  // render as list or grid
  itemTemplate(product, layout) {
    if (!product) {
      return "";
    }
    return (
      <>
        {layout === "list" ? (
          <ListItem data={product} openDetails={this.openDetails} />
        ) : (
            <GridItem data={product} openDetails={this.openDetails} />
          )}
      </>
    );
  }

  renderHeader() {
    let onOptionChange = (e) => {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({
            loading: false,
            layout: e.value,
          });
        }, 1000);
      });
    };

    return (
      <div className="p-grid">
        <div className="p-col-1">
          <div style={{ textAlign: "left" }}>
            <DataViewLayoutOptions
              layout={this.state.layout}
              onChange={onOptionChange}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const header = this.renderHeader();

    return (
      <>
        <div className="dataview-demo">
          <div className="card">
            <DataView
              className="mt-5"
              value={this.state.products}
              layout={this.state.layout}
              header={header}
              itemTemplate={this.itemTemplate}
              lazy
              paginator
              paginatorPosition={"both"}
              rows={this.rows}
              totalRecords={this.state.totalRecords}
              first={this.state.first}
              onPage={this.onPage}
              loading={this.state.loading}
            />
          </div>
        </div>

        <ItemDetails
          close_details={this.close_details}
          itemDetailsIsOpen={this.state.itemDetailsIsOpen}
          selectedFilmId={this.state.selectedFilmId}
        />
      </>
    );
  }
}
