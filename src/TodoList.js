import Todo from "./Todo";

const TodoList = ({
  currentTime,
  editTodo,
  list,
  editDueDate,
  markDone,
  remove,
  removeTag,
  seed,
}) => {
  let doneMessages = [
    "Yer done did! 🤙🏾🤙🏽🤙",
    "Got 'em! 🎯",
    "Time to go surfing! 🏄🏾",
    "Woot! All done!",
    "Time to party! 🥳",
    "All done! ✔️",
    "Time for a coffee break! ☕",
    "Tea time! 🍵",
    "Boba break! 🧋",
    "Time for some meditation. 🧘🏽",
  ];

  return (
    <>
      {list.filter((todo) => !todo.isDone)?.length ? (
        <div className="container todo-list">
          <ul className="list-group">
            {list.map((todo, index) =>
              todo.isDone ? (
                ""
              ) : (
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
              )
            )}
          </ul>
        </div>
      ) : (
        <div className="empty">
          <h2>{doneMessages[Math.floor(seed * doneMessages.length)]}</h2>
        </div>
      )}
    </>
  );
};

export default TodoList;
