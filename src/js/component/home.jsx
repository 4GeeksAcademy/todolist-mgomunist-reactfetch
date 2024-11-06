import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Cargar tareas desde la API
  const loadTasks = async () => {
    try {
      const url = "https://playground.4geeks.com/todo/users/mgomunist";
      const resp = await fetch(url);
      if (resp.status === 404) {
        await createUser();
      } else {
        const data = await resp.json();
        setTasks(data.todos || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Crear usuario en la API si no existe
  const createUser = async () => {
    try {
      const resp = await fetch("https://playground.4geeks.com/todo/users/mgomunist", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (resp.status === 201) {
        await loadTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Guardar una tarea en la API
  const saveTask = async (task) => {
    try {
      const url = "https://playground.4geeks.com/todo/todos/mgomunist";
      const resp = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: task, is_done: false })
      });
      if (resp.ok) {
        await loadTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Borrar una tarea de la API
  const deleteTask = async (id) => {
    try {
      const url = `https://playground.4geeks.com/todo/todos/${id}`;
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (resp.ok) {
        await loadTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Borrar todas las tareas
  const deleteAllTasks = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar todas las tareas?");
    if (confirmDelete) {
      try {
        await Promise.all(tasks.map((task) => {
          return fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
            method: "DELETE",
          });
        }));
        setTasks([]); // Limpiar la lista de tareas en el estado
        console.log("Todas las tareas han sido eliminadas.");
      } catch (error) {
        console.log("Error al eliminar todas las tareas:", error);
      }
    }
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      saveTask(inputValue.trim());
      setInputValue("");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const TodoItem = ({ task }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <li
        className={`list-group-item d-flex justify-content-between align-items-center ${
          isHovered ? "bg-light" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {task.label}
        {isHovered && (
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task.id)}
          >
            <strong>X</strong>
          </button>
        )}
      </li>
    );
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
      {/* Mostrar el botón solo si hay tareas */}
      {tasks.length > 0 && (
        <button className="btn btn-danger mb-3" onClick={deleteAllTasks}>
          Eliminar todas las tareas
        </button>
      )}
      <ul className="list-group">
        {tasks.map((task, index) => (
          <TodoItem key={index} task={task} />
        ))}
      </ul>
      <p className="task-counter">
        {tasks.length} {tasks.length === 1 ? "tarea pendiente" : "tareas pendientes"}
      </p>
      {tasks.length === 0 && (
        <p className="text-center text-muted">No hay tareas, añadir tareas.</p>
      )}
    </div>
  );
};

export default Home;