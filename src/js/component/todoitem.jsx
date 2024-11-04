import React, { useState } from "react";

const TodoItem = ({ task, index, handleDeleteTask }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={`list-group-item d-flex justify-content-between align-items-center ${
        isHovered ? "bg-light" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {task}
      {isHovered && (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteTask(index)}
        >
          <strong>X</strong>
        </button>
      )}
    </li>
  );
};

export default TodoItem;