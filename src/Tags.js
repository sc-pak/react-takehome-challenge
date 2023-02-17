import Tag from "./Tag.js";

function Tags({ list, remove, select }) {
  return (
    <div className="row text-start">
      {Array.isArray(list) &&
        list.map((tag, index) => (
          <div key={index} className={"text-start col-auto"}>
            <Tag
              index={index}
              text={tag.text}
              color={tag.color}
              isSelected={tag.selected}
              remove={remove}
              select={select}
            />
          </div>
        ))}
    </div>
  );
}

export default Tags;
