import "./App.css";
import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmployeeList from "./components/EmployeeList/EmployeeList";
import Temperature from "./components/Temperatures/Temperature";

import logo from "./assets/logo2.png";

import Button from "@material-ui/core/Button";

import getEmployees from "./utils/getEmployees";

function App() {
  const [employee, setEmployees] = useState();
  const [temp, setTemp] = useState(36);
  const [tempDecimals, setTempDecimals] = useState(0);
  const [currentEmployee, setCurrentEmployee] = useState({
    name: "",
    cod: "",
    nCra: "",
  });

  useEffect(() => {
    (async () => {
      const employeeRes = await getEmployees();
      setEmployees(employeeRes);
    })();
  }, []);

  const handleSubmit = async () => {
    const body = {
      codUsu: currentEmployee.cod,
      codNameUsu: currentEmployee.cod,
      tmpAfe: parseFloat(temp + "." + tempDecimals),
    };
    if (currentEmployee.name.length < 2) {
      toast.error(`Informe um usuário`);
      return;
    }
    const response = await fetch(
      "http://192.168.0.11:5555/employees/store-temperature",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const parseRes = await response.json();
    if (response.status === 401) {
      toast.dark(parseRes);
    } else {
      toast.info(parseRes);
    }
  };

  return (
    <div className="App">
      <img className="logo" src={logo} alt="logo"></img>
      <form className="mb-6 w-4/5 formTemp" action="/" method="post">
        <EmployeeList
          employees={employee}
          onChangeForm={(value, value1) => {
            if (value1) {
              setCurrentEmployee({
                name: value1.name,
                cod: value1.cod,
                nCra: value1.nCra,
              });
            }

            if (value1 == null) {
              setCurrentEmployee({
                name: "",
                cod: "",
                nCra: "",
              });
            }
          }}
        />
        <Temperature
          handleChange={(value, value1) => {
            setTemp(value1.props.value);
          }}
          handleChangeDecimals={(value, value1) => {
            setTempDecimals(value1.props.value);
          }}
        />

        <Button
          onClick={handleSubmit}
          className="form-btn"
          variant="contained"
          color="primary"
        >
          Gravar
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          pauseOnFocusLoss={false}
        />
      </form>
    </div>
  );
}

export default App;
