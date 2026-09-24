import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Todo.css";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    // =========================
    // GET TODOS
    // =========================
    const fetchTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/todos");
            const data = await response.json();

            setTodos(data);
        } catch (error) {
            console.log("Fetch Todo Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // =========================
    // ADD TODO
    // =========================
    const addTodo = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                }),
            });

            const newTodo = await response.json();

            setTodos([newTodo, ...todos]);
            setTitle("");
        } catch (error) {
            console.log("Add Todo Error:", error);
        }
    };

    // =========================
    // COMPLETE / INCOMPLETE
    // =========================
    const toggleTodo = async (todo) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/todos/${todo._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: todo.title,
                        completed: !todo.completed,
                    }),
                }
            );

            const updatedTodo = await response.json();

            setTodos(
                todos.map((item) =>
                    item._id === updatedTodo._id ? updatedTodo : item
                )
            );
        } catch (error) {
            console.log("Toggle Todo Error:", error);
        }
    };

    // =========================
    // EDIT TODO
    // =========================
    const editTodo = async (todo) => {
        const newTitle = window.prompt("Edit your todo:", todo.title);

        if (!newTitle || !newTitle.trim()) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/todos/${todo._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        title: newTitle.trim(),
                        completed: todo.completed,
                    }),
                }
            );

            const updatedTodo = await response.json();

            setTodos(
                todos.map((item) =>
                    item._id === updatedTodo._id ? updatedTodo : item
                )
            );
        } catch (error) {
            console.log("Edit Todo Error:", error);
        }
    };

    // =========================
    // DELETE TODO
    // =========================
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/todos/${id}`, {
                method: "DELETE",
            });

            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.log("Delete Todo Error:", error);
        }
    };

    return (
        <section className="todo-section">

            {/* Back to Home */}
            <Link to="/" className="todo-back-home">
                ← Back to Home
            </Link>

            <div className="todo-container">

                <h1>My Todo App</h1>

                <p className="todo-subtitle">
                    Manage your daily tasks easily
                </p>

                {/* Add Todo */}
                <form className="todo-form" onSubmit={addTodo}>

                    <input
                        type="text"
                        placeholder="Enter your task..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <button type="submit">
                        Add Todo
                    </button>

                </form>

                {/* Todo List */}
                <div className="todo-list">

                    {loading ? (
                        <p className="empty-message">
                            Loading...
                        </p>
                    ) : todos.length === 0 ? (
                        <p className="empty-message">
                            No todos yet. Add your first task!
                        </p>
                    ) : (
                        todos.map((todo) => (

                            <div
                                className={`todo-item ${todo.completed ? "completed" : ""
                                    }`}
                                key={todo._id}
                            >

                                <div className="todo-left">

                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo)}
                                    />

                                    <span>{todo.title}</span>

                                </div>

                                <div className="todo-actions">

                                    <button
                                        className="edit-btn"
                                        onClick={() => editTodo(todo)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>

        </section>
    );
}

export default Todo;