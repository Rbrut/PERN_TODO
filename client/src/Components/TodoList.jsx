import { Fragment, useEffect, useState } from "react";
import TodoUpdate from "./TodoUpdate";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      //getTodos(); // call to update page
      setTodos(todos.filter((todo) => todo.t_id !== id));
      //console.log(deleteTodo);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Get all todos
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      console.log(response);
      const data = await response.json();
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log("here are the ", todos);

  todos.map((todo) => {
    console.log(todo.t_id, todo.description);
  });

  return (
    <>
      <Fragment>
        <h1 className="text-center mt-5">Todo List</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.t_id}>
                <td>{todo.description}</td>
                <td>
                  <TodoUpdate todo={todo} />
                </td>
                <td>
                  <button
                    onClick={() => deleteTodo(todo.t_id)}
                    className="btn btn-danger ms-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    </>
  );
};

export default TodoList;
