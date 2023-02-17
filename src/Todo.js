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
  return (
    <li
      //   key={index}
      className="list-group-item todo"
      style={
        Date.parse(todo.dueDate) < currentTime ? { borderLeftColor: "red" } : {}
      }
    >
      <div key={index} className="container text-center">
        {!todo.isDone ? (
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
                  <PriorityTag text={todo.priority} />
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
                >
                  Done
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
        ) : (
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
        )}
      </div>
    </li>
  );
}

export default Todo;
