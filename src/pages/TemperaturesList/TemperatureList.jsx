import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import LinearProgress from "@material-ui/core/LinearProgress";

import "./temperaturelist.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "dodgerblue",
    color: "white",
    fontWeight: "bold",
    width: "max-content",
  },
  body: {
    fontSize: 14,
    width: "max-content",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      width: "max-content",
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
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/"), [history]);
  const [temps, setTemps] = useState([]);
  const [pageload, setPageload] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "http://192.168.0.11:5555/temperatures/get-temperatures"
        );

        setTemps(await response.json());
      } catch (error) {
        console.log(error);
      }
      setPageload(true);
    })();
  }, []);

  return (
    <div className="temps-wrap">
      <div className="bar">
        <Button
          className="back-btn"
          variant="text"
          color="primary"
          onClick={handleOnClick}
        >
          <ArrowBackIcon />
        </Button>
        <h1>Temperaturas registradas hoje</h1>
      </div>

      <div className="table-container">
        {pageload ? (
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
        ) : (
          <LinearProgress style={{ width: "100%" }} />
        )}
      </div>
      <div className="bar">
        <Button
          className="back-btn"
          variant="text"
          color="primary"
          onClick={handleOnClick}
        >
          <ArrowBackIcon />
        </Button>
      </div>
    </div>
  );
};

export default TemperatureList;
