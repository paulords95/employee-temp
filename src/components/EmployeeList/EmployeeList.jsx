import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function EmployeeList(props) {
  useEffect(() => {
    console.log(props.employees);
  }, []);
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
          onChange={(event, value2) => {
            console.log(value2);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Nome" variant="outlined" />
          )}
        />
      </div>
    );
  }
}
