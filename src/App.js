import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import DoneList from "./DoneList";
import SortDropdown from "./SortDropdown";
import "./App.css";

/**
 * This method converts a date string into a standard ISO local system time format.
 * The Date object and its prototype methods tend to treat the date inputs as UTC time values,
 * even if a local time string is set as a parameter. This helper method handles inputs from the
 * datepicker and converts it accordingly in order for it to be used in the rest of the app.
 *
 * @param {The datetime string from the default datepicker} date
 * @returns a datestring converted to local time and in local ISO string format: YYYY-MM-DDThh:mm:ss
 */
const localizeISODateString = (date) => {
  let timeDiffinMins = new Date(date).getTimezoneOffset();

  let milleseconds = Date.parse(date);

  let ISODateStringInUTCFormat = new Date(
    milleseconds - timeDiffinMins * 60 * 1000
  ).toISOString();

  /* Remove UCT indication YYYY-MM-DDThh:mm:ss.sssZ -> YYYY-MM-DDThh:mm:ss */
  const split = ISODateStringInUTCFormat.split(":");
  return split[0] + ":" + split[1]; //YYYY-MM-DDThh:mm:ss
};

/**
 * Main Todo App function
 *
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

  /**
   *Updates state of todos and saves it to localstorage
   * @param {array} newTodos the todo array to be saved to localstorage and set to app state todos
   */
  const setTodosWrapper = (newTodos) => {
    window.localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  /**
   * Gets current system time
   * @returns current time
   */
  const getCurrentTime = () => {
    setCurrentTime(new Date());
    return currentTime;
  };

  /**
   * Adds a task to todos object and updates app states.
   */
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

  /**
   * Delete a todo and update todos state
   * @param {int} key the todo index in the todos array
   */
  const deleteTodo = (key) => {
    const newTodos = todos.filter((_, index) => {
      return index !== key;
    });
    setTodosWrapper(newTodos);
  };

  /**
   * TODO: This method will delete a specific todo item's tag whenever tags are implemented and available
   * @param {int} todoKey
   * @param {int} tagKey
   */
  const deleteTodoTag = (todoKey, tagKey) => {
    todos[todoKey].tags = todos[todoKey].tags.filter((_, index) => {
      return index !== tagKey;
    });
    setTodosWrapper(todos);
  };

  /**
   * TODO: This method will delete available tags in the todo input form whenever tags are implemented
   * @param {int} key
   */
  const deleteAvailableTag = (key) => {
    const newTags = tags.filter((_, index) => {
      return index !== key;
    });

    setTags(newTags);
  };

  /**
   * Updates priority state for indicating which priority is selected in the todo form
   * @param {string} selection
   */
  const selectPriority = (selection) => {
    if (priority === "none") {
      setPriority(selection);
    } else if (priority === selection) {
      setPriority("none");
    } else {
      setPriority(selection);
    }
  };

  /**
   * Toggles the tag that was selected or unselected
   * @param {int} key
   */
  const toggleTagSelection = (key) => {
    const newTags = [...tags];
    newTags[key].selected = !newTags[key].selected;
    setTags(newTags);
  };

  /**
   * Updates todos array with the subject todo and its edited text
   * @param {string} edit the edited todo text
   * @param {int} key the index of the subjected todo index in the array of todos
   */
  const editTodo = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].text = edit;
    setTodosWrapper(newTodos);
  };

  /**
   * Updates duedate for the specific todo in the todos array
   * @param {date-time string} edit
   * @param {int} key
   */
  const editDueDate = (edit, key) => {
    const newTodos = [...todos];
    newTodos[key].dueDate = edit;
    newTodos[key].overdue = Date.parse(edit) < currentTime;
    setTodosWrapper(newTodos);
  };

  /**
   * Toggles the boolean state of the specified todo's isDone property and updates the todo array
   * @param {int} key
   */
  const markDone = (key) => {
    const newTodos = [...todos.filter((_, index) => index !== key), todos[key]];
    newTodos[newTodos.length - 1].isDone =
      !newTodos[newTodos.length - 1].isDone;
    setTodosWrapper(newTodos);
  };

  /**
   * Sorts the todo array according to the sortType given.
   * @param {string} sortType
   */
  const sortTodos = (sortType) => {
    let sortedTodos = [...todos];
    let Priorities = {
      high: 3,
      medium: 2,
      low: 1,
      none: 0,
    };
    if (sortType.toLowerCase() === "earliest due date") {
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

  // Gets the current time at every second to check todo due dates for overdue state
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

      {todos.filter((todo) => !todo.isDone)?.length ? (
        <>
          <div className="container">
            <div className="row justify-content-end mb-3">
              <SortDropdown
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortTodos={sortTodos}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}

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
      <DoneList
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
