import { Fragment, useState } from "react";

const TodoUpdate = ({ todo }) => {
  console.log(todo);
  const [description, setDescription] = useState(todo.description);

  const handleUpdate = async (e) => {
    e.preventDefault;
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/todos/${todo.t_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target={`#id${todo.t_id}`}
        >
          Edit
        </button>

        <div
          className="modal fade"
          id={`id${todo.t_id}`}
          onClick={() => setDescription(todo.description)}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Todo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setDescription(todo.description)}
                ></button>
              </div>
              <div className="modal-body">
                <form className="d-flex">
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Enter description"
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setDescription(todo.description)}
                >
                  Close
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={(e) => handleUpdate(e)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default TodoUpdate;
