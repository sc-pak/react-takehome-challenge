const TodoForm = ({ todoText, setTodoText, dueDate, setDueDate, addTodo }) => {
  return (
    <div className="container mb-4">
      <div className="container align-self-center mb-2">
        <textarea
          className="form-control"
          type="text"
          name="formTodoInput"
          value={todoText}
          placeholder="Create a new todo"
          onChange={(e) => {
            setTodoText(e.target.value);
          }}
        />
      </div>

      <div className="container mb-2">
        <div className="row text-end justify-content-end ms-auto align-self-end">
          <div className="col-4 text-start align-self-center">
            <label htmlFor="dueDate" style={{ color: "white" }}>
              Set Due Date:
            </label>
          </div>

          <div className="col-8">
            <input
              className="form-control text-center"
              type="datetime-local"
              name="formDueDate"
              value={dueDate}
              onChange={(e) => {
                console.log("e", e);
                setDueDate(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="container justify-content-center">
        <button
          className="col-12 add-button btn btn-outline-secondary"
          onClick={addTodo}
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
