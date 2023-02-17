function SortDropdown(props) {
  return (
    <div className="col-2 dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sort by
      </button>
      <ul className="dropdown-menu">
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={(e) => {
              props.sortTodos(e.target.textContent);
            }}
          >
            Earliest due date
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={(e) => {
              props.sortTodos(e.target.textContent);
            }}
          >
            Highest priority
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            href="#"
            onClick={(e) => {
              props.sortTodos(e.target.textContent);
            }}
          >
            Latest due date
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SortDropdown;
