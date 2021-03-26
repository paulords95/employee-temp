import React from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Alert, AlertTitle } from "@material-ui/lab";

export default function EmployeeList(props) {
  if (!props.employees) {
    return <CircularProgress />;
  } else if (
    props.employees === undefined ||
    props.employees.length < 5 ||
    props.employees.toString() === "TypeError: Failed to fetch"
  ) {
    return (
      <Alert severity="error">
        <AlertTitle>
          <strong>Erro ao buscar colaboradores</strong>
        </AlertTitle>
        Não foi possível buscar lista de colaboradores -
        <strong> Reincie o aplicativo!</strong>
      </Alert>
    );
  } else {
    return (
      <div
        style={{
          width: "max-content",
          margin: "0 auto",
        }}
      >
        <Autocomplete
          id="combo-box-demo"
          options={props.employees}
          getOptionLabel={(option) => option.name}
          style={{ width: "85vw", maxWidth: "500px" }}
          onChange={props.onChangeForm}
          renderInput={(params) => (
            <TextField {...params} label="Nome" variant="outlined" />
          )}
        />
      </div>
    );
  }
}
