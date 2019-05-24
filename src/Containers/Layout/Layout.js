import React, { Component } from "react";

import NavBar from "../../Components/Navigation/Navbar/Navbar";
import MeteoriteTable from "../../Components/Table/MeteoriteTable";
import Loading from "../../Components/Loading/Loading";


import { MenuItem, TextField, Button } from "@material-ui/core";
class Layout extends Component {

  textInput = React.createRef();
  state = {
    table: null,
    search: null,
    backup: null,
    clicked: false,
  };
  componentDidMount() {
    if(this.state.table=== null) {
      fetch("https://data.nasa.gov/resource/gh4g-9sfh.json/")
      .then(res => res.json())
   
      .then(res => this.setState({ table: res, backup: res }));
    }
    
  }

  handleClick = e => {
    this.setState({
      clicked: true
    })
  };

  handleChange = e => {
    
    this.state.table.map((meteor, i) => {
      
      let table = [];
      let search = e.target.value.toLocaleLowerCase().charAt(0).toUpperCase() + e.target.value.slice(1);
      if(meteor.name === search) {
        table.push(this.state.table[i])
       this.setState({
         search:table
       })
      } else if(search === '') {
        this.setState({
          table: this.state.backup,
          search: null,
        })
      }
    })  
     
   
 
  }
  render() {
    let meteoriteTable;

    if(this.state.table) {
      debugger;
      if(this.state.clicked && this.state.search && this.state.search !== this.state.backup) {
        meteoriteTable = <MeteoriteTable tableData={this.state.search} />
      } else {
        meteoriteTable = <MeteoriteTable tableData={this.state.table} />
      }
     
    } else {
      meteoriteTable = <Loading />
    }

    
    return (
      <React.Fragment>
        <NavBar />
        <form onSubmit={e => e.preventDefault()}>
          <TextField
            id="search"
            label="Search field"
            type="text"
            margin="normal"
            variant="outlined"
           
            onChange={this.handleChange}
          />
          <Button variant="contained" color="primary" type="submit" onClick={this.handleClick}>
            howdy partner
          </Button>
        </form>
          {meteoriteTable}
      </React.Fragment>
    );
  }
}

export default Layout;
