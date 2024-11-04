import React, { useState } from "react";
import TodoList from "./todolist";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">to-dos</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Añadir una tarea..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleAddTask}
        />
      </div>
      <TodoList tasks={tasks} handleDeleteTask={handleDeleteTask} />
      <p className="task-counter">{tasks.length} {tasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}</p>
	  {tasks.length === 0 && (
        <p className="text-center text-muted">No hay tareas, añadir tareas.</p>
      )}
    </div>
  );
};

export default Home;