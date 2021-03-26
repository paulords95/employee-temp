import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function EmployeeList(props) {
  if (!props.employees) {
    return <div>Carregando</div>;
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
