import { useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      //console.log(response);
      window.location = "/";
      setDescription("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5">Pern Todo</h1>
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter description"
        />
        <button className="btn btn-primary ms-3">Add description</button>
      </form>
    </>
  );
};

export default TodoInput;
