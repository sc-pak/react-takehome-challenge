const TodoList = ({ list, remove }) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="todo-list">
          {list.map((entry, index) => (
            <div key={index} className="todo">
              <div className="todo-entry">{entry}</div>
              <button
                className="delete-button"
                onClick={() => {
                  remove(entry);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>No task found</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
