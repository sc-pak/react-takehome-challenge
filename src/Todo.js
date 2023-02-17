import Tags from "./Tags";
import Priorities from "./Priorities";
import PriorityTag from "./PriorityTag";

function Todo({
  todo,
  index,
  editTodo,
  currentTime,
  markDone,
  editDueDate,
  remove,
  removeTag,
}) {
  let borderLeftColor = "#333";

  if (Date.parse(todo.dueDate) < currentTime) {
    borderLeftColor = "red";
  } else if (todo.priority === "high") {
    borderLeftColor = "red";
  } else if (todo.priority === "medium") {
    borderLeftColor = "yellow";
  } else if (todo.priority === "low") {
    borderLeftColor = "grey";
  } else {
    borderLeftColor = "green";
  }

  return (
    <>
      {!todo.isDone ? (
        <li
          className="list-group-item todo"
          style={{ borderLeftColor: borderLeftColor }}
        >
          <div key={index} className="container text-center">
            <div className="row">
              <div className="todo-entry col mx-1">
                <div className="row">
                  <textarea
                    className="form-control col mb-1"
                    type="text"
                    value={todo.text}
                    onChange={(e) => {
                      editTodo(e.target.value, index);
                    }}
                    style={{ background: "#333", color: "white" }}
                  ></textarea>
                </div>

                <div className="duedate-group row text-start justify-content-start">
                  {Date.parse(todo.dueDate) < currentTime ? (
                    <span className="badge text-bg-danger align-self-center">
                      overdue
                    </span>
                  ) : (
                    ""
                  )}
                  <label
                    className="col-2 text-end align-self-center"
                    htmlFor="dueDate"
                    style={{ color: "white" }}
                  >
                    Due:
                  </label>
                  <div className="col-8 align-self-center">
                    <input
                      className="col-md-8 text-end align-self-center"
                      name="todoDueDate"
                      type="datetime-local"
                      value={todo.dueDate}
                      onChange={(e) => {
                        editDueDate(e.target.value, index);
                      }}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>

                <div className="tags row text-start">
                  <div key={index} className={"text-start col-auto"}>
                    {todo.priority !== "none" ? (
                      <PriorityTag text={todo.priority} />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>

              <div
                className="btn-group col-3 justify-content-center"
                role="group"
              >
                <div className="row justify-content-center">
                  <button
                    type="button"
                    className="toggle-done-button btn"
                    onClick={() => {
                      markDone(index);
                    }}
                    style={{ fontSize: "1.5rem" }}
                    title="Mark Done"
                  >
                    ✅
                  </button>

                  <button
                    type="button"
                    className="delete-button btn"
                    onClick={() => {
                      remove(index);
                    }}
                    style={{ fontSize: "1.5rem" }}
                    data-bs-toggle="tooltip"
                    title="Delete To-do"
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      ) : (
        <li
          className="list-group-item todo"
          style={{ borderLeftColor: "grey" }}
        >
          <div key={index} className="container text-center">
            <div className="container text-center col justify-content-start todo-entry">
              <div className="row">
                <s> {todo.text}</s>
              </div>

              <div className="btn-group row ms-auto" role="group">
                <div className="justify-content-center">
                  <button
                    type="button"
                    className="toggle-done-button btn"
                    onClick={() => {
                      markDone(index);
                    }}
                  >
                    Restore
                  </button>

                  <button
                    type="button"
                    className="delete-button btn"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default Todo;
