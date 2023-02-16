import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import "./App.css";

const localizeISODateString = (date) => {
  // Get time difference from UTC to local time zone in minutes
  let td = new Date(date).getTimezoneOffset();

  // Get millisecond representation of date value
  let milleseconds = Date.parse(date);

  // Subtract time difference from date value and convert to ISO string
  let UCTISODateString = new Date(milleseconds - td * 60 * 1000).toISOString();

  /* Converting from new Date() object to ISO string assumes UCT timezone, 
  so remove UCT indication YYYY-MM-DDThh:mm:ss.sssZ -> YYYY-MM-DDThh:mm:ss */
  const split = UCTISODateString.split(":");
  return split[0] + ":" + split[1]; //YYYY-MM-DDThh:mm:ss
};

/**
 * Main App function
 * @returns App <div> rendering
 */
const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  );
  const [todoText, setTodoText] = useState("");
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(
    localizeISODateString(new Date().toISOString())
  );
  const [currentTime, setCurrentTime] = useState(new Date());

  const setTodosWrapper = (newTodos) => {
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
    return setTodos(newTodos);
  };

  const getCurrentTime = () => {
    setCurrentTime(new Date());
    return currentTime;
  };

  const addTodo = () => {
    if (todoText !== "") {
      setTodosWrapper([
        ...todos,
        {
          text: todoText,
          isDone: false,
          dueDate: date,
          overdue: false,
        },
      ]);
      setTodoText("");
      setDate(localizeISODateString(new Date().toISOString()));
    }
  };

  const deleteTodo = (key) => {
    const newTodos = todos.filter((_, index) => {
      return index !== key;
    });
    setTodosWrapper(newTodos);
  };

  const editTodo = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].text = edit;
    setTodosWrapper(newTodos);
  };

  const editDueDate = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].dueDate = edit;
    setTodosWrapper(newTodos);
  };

  const markDone = (key) => {
    const newTodos = [...todos.filter((_, index) => index !== key), todos[key]];
    newTodos[newTodos.length - 1].isDone =
      !newTodos[newTodos.length - 1].isDone;
    setTodosWrapper(newTodos);
  };

  useEffect(() => {
    const interval = setInterval(() => getCurrentTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App container">
      <h1>React Todo App</h1>

      <TodoForm
        todoText={todoText}
        setTodoText={setTodoText}
        dueDate={date}
        setDueDate={setDate}
        addTodo={addTodo}
      />

      <TodoList
        list={todos}
        remove={deleteTodo}
        edit={edit}
        editTodo={editTodo}
        setEdit={setEdit}
        editDueDate={editDueDate}
        markDone={markDone}
        currentTime={currentTime}
      />
    </div>
  );
};

export default App;
