const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

//
app.listen(port, () => {
  console.log("App runing on port 5000");
});

// middleware
app.use(cors()); // for middleware always use app.use
app.use(express.json()); // when creating fullstack we need to get data from the client, we have to get it from the req.body object

// ROUTES //

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    console.log(description);

    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    console.log(allTodos.rows);
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const thisTodo = await pool.query("SELECT * FROM todo WHERWE t_id = $1", [
      id,
    ]);
    res.json(thisTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateDoto = await pool.query(
      "UPDATE todo SET description = $1 WHERE t_id = $2",
      [description, id]
    );
    res.json("To was updated.");
    //res.json(updateDoto); // Cannot set headers after they are sent to the client
  } catch (error) {
    console.error(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodo = await pool.query("DELETE FROM todo WHERE t_id = $1", [id]);
    if (delTodo.rowCount > 0) {
      res.json("Todo deleted succesfully");
    } else {
      res.status(404).json("Todo not found");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});
