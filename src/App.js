import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import SortDropdown from "./SortDropdown";
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
 * Main Todo App function
 * @returns rendering of Todo App
 */
const App = () => {
  // States
  const [edit, setEdit] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [date, setDate] = useState(
    localizeISODateString(new Date().toISOString())
  );
  const [todos, setTodos] = useState(
    JSON.parse(window.localStorage.getItem("todos")) || []
  );
  const [todoText, setTodoText] = useState("");
  const [tags, setTags] = useState(
    JSON.parse(window.localStorage.getItem("tags")) || [
      {
        text: "high",
        color: "red",
        selected: false,
      },
      {
        text: "medium",
        color: "yellow",
        selected: false,
      },
      {
        text: "low",
        color: "green",
        selected: false,
      },
    ]
  );

  const [priority, setPriority] = useState("none");
  const [seed, setSeed] = useState(Math.random());
  const [sortBy, setSortBy] = useState("earliestDueDate");

  // Update Methods

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
          overdue: Date.parse(date) < currentTime,
          tags: tags,
          priority: priority,
        },
      ]);
      setTodoText("");
      setDate(localizeISODateString(new Date().toISOString()));
      setPriority("none");
    } else {
      // Todo: blink text input in form to indicate why task was not created
    }
  };

  const deleteTodo = (key) => {
    const newTodos = todos.filter((_, index) => {
      return index !== key;
    });
    setTodosWrapper(newTodos);
  };

  const deleteTodoTag = (todoKey, tagKey) => {
    todos[todoKey].tags = todos[todoKey].tags.filter((_, index) => {
      return index !== tagKey;
    });
    setTodosWrapper(todos);
  };

  const deleteAvailableTag = (key) => {
    const newTags = tags.filter((_, index) => {
      return index !== key;
    });

    setTags(newTags);
  };

  const selectPriority = (selection) => {
    if (priority === "none") {
      setPriority(selection);
    } else if (priority === selection) {
      setPriority("none");
    } else {
      setPriority(selection);
    }
  };

  const toggleTagSelection = (key) => {
    const newTags = [...tags];
    newTags[key].selected = !newTags[key].selected;
    setTags(newTags);
  };

  const editTodo = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].text = edit;
    setTodosWrapper(newTodos);
  };

  const editDueDate = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].dueDate = edit;
    newTodos[key].overdue = Date.parse(edit) < currentTime;
    setTodosWrapper(newTodos);
  };

  const markDone = (key) => {
    const newTodos = [...todos.filter((_, index) => index !== key), todos[key]];
    newTodos[newTodos.length - 1].isDone =
      !newTodos[newTodos.length - 1].isDone;
    setTodosWrapper(newTodos);
  };

  const sortTodos = (sortType) => {
    console.log("inside sortTodo function with sortType: ", sortType);
    let sortedTodos = [...todos];
    let Priorities = {
      high: 3,
      medium: 2,
      low: 1,
      none: 0,
    };
    if (sortType.toLowerCase() === "earliest due date") {
      console.log("sorting by earliest due date");
      sortedTodos.sort((a, b) => {
        if (a.dueDate > b.dueDate) {
          return 1;
        } else if (a.dueDate < b.dueDate) {
          return -1;
        } else if (a.dueDate === b.dueDate) {
          return 0;
        }
      });
    } else if (sortType.toLowerCase() === "highest priority") {
      console.log("sorting by highest priority");
      sortedTodos.sort((a, b) => {
        if (Priorities[a.priority] > Priorities[b.priority]) {
          return -1;
        } else if (Priorities[a.priority] < Priorities[b.priority]) {
          return 1;
        } else if (Priorities[a.priority] === Priorities[b.priority]) {
          return 0;
        }
      });
    } else if (sortType.toLowerCase() === "latest due date") {
      console.log("sorting by highest priority");
      sortedTodos.sort((a, b) => {
        if (a.dueDate > b.dueDate) {
          return -1;
        } else if (a.dueDate < b.dueDate) {
          return 1;
        } else if (a.dueDate === b.dueDate) {
          return 0;
        }
      });
    }

    setTodosWrapper(sortedTodos);
  };

  // Effects

  useEffect(() => {
    const interval = setInterval(() => getCurrentTime(), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App container">
      <h1 className="mb-4">To-do list</h1>

      <TodoForm
        todoText={todoText}
        setTodoText={setTodoText}
        dueDate={date}
        setDueDate={setDate}
        addTodo={addTodo}
        tags={tags}
        removeTag={deleteAvailableTag}
        selectTag={toggleTagSelection}
        selectPriority={selectPriority}
        setPriority={setPriority}
        priority={priority}
      />

      <div className="container">
        <div className="container row justify-content-end mb-3">
          <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortTodos={sortTodos}
          />
        </div>
      </div>

      <TodoList
        list={todos}
        remove={deleteTodo}
        edit={edit}
        editTodo={editTodo}
        setEdit={setEdit}
        editDueDate={editDueDate}
        markDone={markDone}
        currentTime={currentTime}
        removeTag={deleteTodoTag}
        seed={seed}
      />
    </div>
  );
};

export default App;
