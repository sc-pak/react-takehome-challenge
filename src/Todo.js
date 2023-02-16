function Todo({
  todo,
  index,
  editTodo,
  currentTime,
  markDone,
  editDueDate,
  remove,
}) {
  return (
    <div>
      {!todo.isDone ? (
        <div className=" row">
          <div className="todo-entry col mx-1">
            <div className="row">
              <textarea
                className="col mb-1"
                type="text"
                value={todo.text}
                onChange={(e) => {
                  editTodo(e.target.value, index);
                }}
                style={{ border: "none" }}
              ></textarea>

              {Date.parse(todo.dueDate) < currentTime ? (
                <span className="badge text-bg-danger align-self-center">
                  overdue
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="duedate-input row text-start">
              <label
                className="col-2 align-self-center"
                htmlFor="dueDate"
                style={{ color: "white" }}
              >
                Due:
              </label>
              <div className="col-10 align-self-center ms-auto">
                <input
                  className="text-center align-self-center"
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
          </div>

          <div className="btn-group col-3 justify-content-center" role="group">
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
  );
}

export default Todo;
