import React, { Component } from "react";

import NavBar from "../../Components/Navigation/Navbar/Navbar";
import MeteoriteTable from "../../Components/Table/MeteoriteTable";
import Loading from "../../Components/Loading/Loading";
import "./Layout.css";
import { MenuItem, TextField, Button,  } from "@material-ui/core";
import { withStyles } from '@material-ui/styles'
import capitalize from 'capitalize'


class Layout extends Component {
 
  state = {
    tableData: null,
    search: "",
    backup: null
  };
  componentDidMount() {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
      .then(res => res.json())

      .then(res => this.setState({ tableData: res, backup: res }));
  }

  handleClick = e => {
   
    if (this.state.search === "") {
      return null;
    } else {
      this.setState({
        tableData: this.state.search
      });
    
      
    }
  };

  handleChange = e => {
    if (e.target.value === "" && this.state.tableData !== this.state.backup) {
      this.setState({
        search: this.state.backup
      });
    } else {
      const def = capitalize.words(e.target.value);
      const lowerCase = e.target.value.toLocaleLowerCase();
      const firstLetterUpperCase =
        e.target.value.charAt(0).toUpperCase() +
        e.target.value.slice(1).toLocaleLowerCase();
      const urls = [
        `https://data.nasa.gov/resource/gh4g-9sfh.json?name=${lowerCase}`,
        `https://data.nasa.gov/resource/gh4g-9sfh.json?name=${firstLetterUpperCase}`,
        `https://data.nasa.gov/resource/gh4g-9sfh.json?name=${def}`,
        `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=name%20like%20%27%25${lowerCase}%25%27`,
        `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=name%20like%20%27%25${firstLetterUpperCase}%25%27`,
        `https://data.nasa.gov/resource/gh4g-9sfh.json?$where=name%20like%20%27%25${def}%25%27`,
        
      ];
    
      Promise.all(
        urls.map(url =>
          fetch(url)
            .then(res => {
              if (res.ok) {
                return res.json();
              } else {
                return null
              }
            })
            .catch("error")
        )
      ).then(data => {
        let biggest = [];
        debugger;
        data.map((meteor, i) => {
          if(meteor === null) 
          return null
          if(biggest[0] === undefined ) {
            biggest = meteor
          } else {
            if(biggest.length <= meteor) {
              biggest = meteor
              
            }
          }
        })

        if(biggest!==null && biggest[0] !== undefined ) {
          
          this.setState({
            search: biggest
          })
        }
      
      });
    }
  
  };
  render() {
    const { classes } = this.props;
    let meteoriteTable;
    
    if (this.state.tableData !== null) {
      debugger;
      meteoriteTable = <MeteoriteTable tableData={this.state.tableData} />;
    
    } else {
      meteoriteTable = <Loading />;
    }

    return (
      <React.Fragment>
        <NavBar />
        <form onSubmit={e => e.preventDefault()}>
          <TextField
          
            id="search"
            label="Enter Meteorite Name"
            type="text"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleClick}
          >
            Search
          </Button>
        </form>
        {meteoriteTable}
      </React.Fragment>
    );
  }
}

export default Layout;
