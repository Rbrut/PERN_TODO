import "./App.css";
import { Fragment } from "react";
// Components
import TodoInput from "./Components/TodoInput";
import TodoList from "./Components/TodoList";

function App() {
  return (
    <>
      <Fragment>
        <div className="container">
          <TodoInput />
          <TodoList />
        </div>
      </Fragment>
    </>
  );
}

export default App;
