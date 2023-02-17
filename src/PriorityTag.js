function PriorityTag({
  todoIndex,
  index,
  text,
  color,
  isSelected,
  remove,
  select,
  setPriority,
  selectPriority,
  priority,
}) {
  return (
    <span
      className={
        "tag container badge rounded-pill border " +
        (priority === text ? " border-5 border-white" : "")
      }
    >
      <div className="row text-start justify-content-start">
        <div
          className={"col-8 align-self-center"}
          value={text}
          onClick={(e) => {
            selectPriority(e.target.outerText);
          }}
          style={{ color: "white" }}
        >
          {text}
        </div>
      </div>
    </span>
  );
}

export default PriorityTag;
