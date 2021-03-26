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

  const handleSubmit = () => {
    if (currentEmployee.name.length < 2) {
      toast.error(`Informe um usuário`);
    } else {
      toast.success(`Registro de temperatura para ${currentEmployee.name}`);
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
        <Temperature />

        <Button
          onClick={handleSubmit}
          className="form-btn"
          variant="contained"
          color="primary"
        >
          Gravar
        </Button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default App;
