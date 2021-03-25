import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EmployeeList from "./components/EmployeeList/EmployeeList";
import Temperature from "./components/Temperatures/Temperature";

import logo from "./assets/logo2.png";

import Button from "@material-ui/core/Button";

function App() {
  const notify = () => toast.success("Temperatura Salva");
  return (
    <div className="App">
      <img className="logo" src={logo}></img>
      <form
        className="mb-6 w-4/5"
        className="formTemp"
        action="/"
        method="post"
      >
        <EmployeeList />
        <Temperature />

        <Button
          onClick={notify}
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
