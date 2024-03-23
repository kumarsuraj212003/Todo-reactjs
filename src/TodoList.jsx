import React, { useState } from "react"

function TodoList() {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([todo, ...todos]);
    };

    const toggleComplete = (index) => {
        setTodos(
            todos.map((todo, i) => 
                i === index ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div>
            <AddTodo addTodo={addTodo} />
            {todos.map((todo, index) => (
                <TodoItem 
                    key={index} 
                    index={index} 
                    todo={todo} 
                    toggleComplete={toggleComplete} 
                    deleteTodo={deleteTodo}
                />
            ))}
        </div>
    );
}

function AddTodo({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) return;
        addTodo({ text: value, completed: false });
        setValue("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={value} 
                onChange={e => setValue(e.target.value)} 
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}

function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
    return (
        <div>
            <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                {todo.text}
            </span>
            <button onClick={() => toggleComplete(index)}>
                {todo.completed ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
        </div>
    );
}

export default TodoList