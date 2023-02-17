import Tags from "./Tags";

const TodoForm = ({
  todoText,
  setTodoText,
  dueDate,
  setDueDate,
  addTodo,
  tags,
  removeTag,
  selectTag,
}) => {
  return (
    <div className="container mb-4">
      <div className="textInput-group container align-self-center mb-2">
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

      <div className="dateInput-group container mb-2">
        <div className="row text-end justify-content-start ms-auto align-self-end">
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

      <div className="tagSelect-group container mb-2">
        <div className="row text-start justify-content-start ms-auto align-self-end">
          <div className="col-3 text-start align-self-center">
            <label htmlFor="dueDate" style={{ color: "white" }}>
              Select Tags:
            </label>
          </div>

          <div className="col-6 text-start align-self-center">
            <Tags list={tags} remove={removeTag} select={selectTag} />
          </div>

          <div className="col-3 text-end align-self-center">
            <button className="badge bg-secondary" style={{ width: "auto" }}>
              Add Tag
            </button>
          </div>
        </div>
      </div>

      <div className="createTaskButton-group container justify-content-center">
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
