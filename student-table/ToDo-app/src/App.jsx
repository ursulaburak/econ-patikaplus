import React, { useState } from "react";
import "./index.css";
import TodoHeader from "./components/TodoHeader";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <section className="todoapp">
      <TodoHeader addTodo={addTodo} />
      <section className="main">
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        />
      </section>
      <TodoFooter
        todos={todos}
        clearCompleted={clearCompleted}
        filter={filter}
        setFilter={setFilter}
      />
    </section>
  );
};

export default App;
