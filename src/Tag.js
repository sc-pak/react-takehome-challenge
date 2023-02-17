function Tag({ index, text, color, isSelected, remove, select }) {
  return (
    <span
      className={
        "tag container badge rounded-pill border " +
        (isSelected ? " border-5 border-white" : "")
      }
    >
      <div className="row text-start justify-content-start">
        <div
          className={"col-8 align-self-center"}
          value={text}
          onClick={() => {
            select(index);
          }}
          style={{ color: "white" }}
        >
          {text}
        </div>

        <button
          type="button"
          className="col-4 btn-close btn-close-white align-self-center"
          style={{ marginLeft: "5px", marginRight: "3px", width: "2px" }}
          onClick={(e) => {
            remove(index);
          }}
        ></button>
      </div>
    </span>
  );
}

export default Tag;
