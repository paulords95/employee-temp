import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "darkgrey",
    color: "black",
    fontWeight: "bold",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: "100%",
  },
});

const TemperatureList = () => {
  const classes = useStyles();
  const [temps, setTemps] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://localhost:5555/temperatures/get-temperatures"
        );

        setTemps(await response.json());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Nome</StyledTableCell>
            <StyledTableCell align="left">Temperatura</StyledTableCell>
            <StyledTableCell align="left">Hora</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {temps.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.temp}</StyledTableCell>
              <StyledTableCell align="left">{row.time}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TemperatureList;
