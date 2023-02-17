import Todo from "./Todo";

const TodoList = ({
  currentTime,
  editTodo,
  list,
  editDueDate,
  markDone,
  remove,
  removeTag,
}) => {
  let doneMessage = "Yer done did!";

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
                removeTag={removeTag}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="empty">
          <p>{doneMessage}</p>
        </div>
      )}
    </>
  );
};

export default TodoList;
