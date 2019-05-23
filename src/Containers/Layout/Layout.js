import React, { Component } from "react";

import NavBar from "../../Components/Navigation/Navbar/Navbar";
import MeteoriteTable from "../../Components/Table/MeteoriteTable";
import Loading from "../../Components/Loading/Loading";
class Layout extends Component {
  state = {
    table: null
  };
  componentDidMount() {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json/")
      .then(res => res.json())
      .then(res => this.setState({ table: res }));
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        {this.state.table ? (
          <MeteoriteTable tableData={this.state.table} />
        ) : (
          <Loading />
        )}
      </React.Fragment>
    );
  }
}

export default Layout;
