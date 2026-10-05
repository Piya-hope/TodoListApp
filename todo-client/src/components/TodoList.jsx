import { useEffect, useState } from "react";
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../servises/todoServices";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const loadTodos = async () => {
        try {
            setLoading(true);

            const response = await getTodos();

            setTodos(response.data);
        } catch (error) {
            console.error("GET error:", error);
            alert("Unable to load todos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a title");
            return;
        }

        try {
            const todo = {
                title: title,
                description: description,
                isCompleted: false
            };

            await createTodo(todo);

            setTitle("");
            setDescription("");

            await loadTodos();
        } catch (error) {
            console.error("POST error:", error);
            console.error(error.response?.data);
            alert("Unable to add todo");
        }
    };

    const handleComplete = async (todo) => {
        try {
            const updatedTodo = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                isCompleted: !todo.isCompleted
            };

            await updateTodo(todo.id, updatedTodo);

            await loadTodos();
        } catch (error) {
            console.error("PUT error:", error);
            console.error(error.response?.data);
            alert("Unable to update todo");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this todo?")) {
            return;
        }

        try {
            await deleteTodo(id);

            await loadTodos();
        } catch (error) {
            console.error("DELETE error:", error);
            console.error(error.response?.data);
            alert("Unable to delete todo");
        }
    };

    return (
        <div className="todo-container">

            <div className="todo-card">

                <h1>My Todo List</h1>
                <p className="subtitle">
                    Manage your daily tasks
                </p>

                <form className="todo-form" onSubmit={handleAdd}>

                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <button type="submit" className="add-button">
                        + Add Todo
                    </button>

                </form>

                <div className="todo-list">

                    {loading ? (
                        <p className="message">Loading...</p>
                    ) : todos.length === 0 ? (
                        <p className="message">
                            No todos yet. Add your first task!
                        </p>
                    ) : (
                        todos.map((todo) => (

                            <div
                                className={`todo-item ${
                                    todo.isCompleted ? "completed" : ""
                                }`}
                                key={todo.id}
                            >

                                <div className="todo-content">

                                    <h3>{todo.title}</h3>

                                    <p>{todo.description}</p>

                                </div>

                                <div className="todo-actions">

                                    <button
                                        type="button"
                                        className="complete-button"
                                        onClick={() => handleComplete(todo)}
                                    >
                                        {todo.isCompleted
                                            ? "Undo"
                                            : "Complete"}
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-button"
                                        onClick={() =>
                                            handleDelete(todo.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))
                    )}

                </div>

            </div>

        </div>
    );
}

export default TodoList;