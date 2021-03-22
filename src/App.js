import "./App.css";

import EmployeeList from "./components/EmployeeList/EmployeeList";
import Temperature from "./components/Temperatures/Temperature";

function App() {
  return (
    <div className="App">
      <form className="mb-6 w-4/5" action="/" method="post">
        <EmployeeList />
        <Temperature />
      </form>
    </div>
  );
}

export default App;
