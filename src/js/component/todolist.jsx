import React from "react";
import TodoItem from "./todoitem";

const TodoList = ({ tasks, handleDeleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map((task, index) => (
        <TodoItem
          key={index}
          task={task}
          index={index}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TodoList;