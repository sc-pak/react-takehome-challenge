import PriorityTag from "./PriorityTag.js";

function Priorities({
  todoIndex,
  list,
  remove,
  select,
  setPriority,
  priority,
  selectPriority,
}) {
  return (
    <div className="row justify-content-center">
      {Array.isArray(list) &&
        list.map((tag, index) => (
          <div key={index} className={"text-start col-auto"}>
            <PriorityTag
              index={index}
              todoIndex={todoIndex}
              text={tag.text}
              color={tag.color}
              isSelected={tag.selected}
              remove={remove}
              priority={priority}
              select={select}
              setPriority={setPriority}
              selectPriority={selectPriority}
            />
          </div>
        ))}
    </div>
  );
}

export default Priorities;
