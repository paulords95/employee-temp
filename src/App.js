import "./App.css";

import EmployeeList from "./components/EmployeeList/EmployeeList";

function App() {
  return (
    <div className="App">
      <form className="mb-6 w-4/5" action="/" method="post">
        <EmployeeList />
      </form>
    </div>
  );
}

export default App;
