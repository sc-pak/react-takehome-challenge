import Todo from "./Todo";

const DoneList = ({
  currentTime,
  editTodo,
  list,
  editDueDate,
  markDone,
  remove,
  removeTag,
}) => {
  return (
    <>
      {list.filter((todo) => todo.isDone)?.length ? (
        <div className="container todo-list">
          <h2>Completed To-Dos</h2>
          <ul className="list-group">
            {list.map((todo, index) =>
              todo.isDone ? (
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
              ) : (
                ""
              )
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default DoneList;
