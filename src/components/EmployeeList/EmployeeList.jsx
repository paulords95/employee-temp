import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await fetch(
        "http://192.168.2.44:5555/employees/get-employees"
      );

      const parseRes = await response.json();
      setEmployees(parseRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div
      style={{
        width: "max-content",
        margin: "0 auto",
      }}
    >
      <Autocomplete
        id="combo-box-demo"
        options={employees}
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
