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
        <div className="container todo-list border-top mt-4 p-3">
          <h2>Completed</h2>
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
