import Todo from "./Todo";

const TodoList = ({
  currentTime,
  editTodo,
  list,
  editDueDate,
  markDone,
  remove,
}) => {
  return (
    <>
      {list?.length > 0 ? (
        <div className="container todo-list">
          <ul className="list-group">
            {list.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                editTodo={editTodo}
                currentTime={currentTime}
                markDone={markDone}
                editDueDate={editDueDate}
                remove={remove}
              />
            ))}
          </ul>
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
