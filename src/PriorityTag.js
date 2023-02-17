function PriorityTag({ text, selectPriority, priority }) {
  let tagColor = "";

  if (text === "high") {
    tagColor = " text-bg-danger";
  } else if (text === "medium") {
    tagColor = " text-bg-warning";
  } else if (text === "low") {
    tagColor = " text-bg-secondary";
  }

  return (
    <span
      className={
        "tag container badge rounded-pill border " +
        (priority === text ? " border-5 border-white " : "") +
        tagColor
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
