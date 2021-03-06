import React from "react";
import Moment from 'react-moment'
import {
  withStyles,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  TextField,
  Button,
  Typography
} from "@material-ui/core";

const MeteoriteTable = props => {

  if(props.tableData.length > 1 && props.tableData.length < 1000) {
    
  }
  return (
   
    <React.Fragment>
      { props.tableData.length > 1 && props.tableData.length < 1000 ? <Typography variant='subtitle1' gutterBottom>We couldn't find the specified meteorite, the data you see are meteorites with similar names</Typography> : null}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name Type</TableCell>
              <TableCell>Rec Class</TableCell>
              <TableCell>Mass (g)</TableCell>
              <TableCell>Fall</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.id}</TableCell>
                <TableCell align="right">{row.nametype}</TableCell>
                <TableCell align="right">{row.recclass}</TableCell>
                <TableCell align="right">{row.mass}</TableCell>
                <TableCell align="right">{row.fall}</TableCell>
                <TableCell align="right"><Moment format="YYYY">{row.year}</Moment></TableCell>
                <TableCell align="right">{row.reclat}</TableCell>
                <TableCell align="right">{row.reclong}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};


export default MeteoriteTable;
