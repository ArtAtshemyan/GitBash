import { useEffect, useState } from "react";
import './Projects.css'

function  Projects() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            return JSON.parse(savedTodos);
        } else {
            return [];
        }
    });
    const [todo, setTodo] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState({});

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleInputChange(e) {
        setTodo(e.target.value);
    }
    function handleEditInputChange(e) {
        setCurrentTodo({ ...currentTodo, text: e.target.value });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        if (todo !== "") {
            setTodos([
                ...todos,
                {
                    id: todos.length + 1,
                    text: todo.trim()
                }
            ]);
        }
        setTodo("");
    }

    function handleEditFormSubmit(e) {
        e.preventDefault();

        handleUpdateTodo(currentTodo.id, currentTodo);
    }

    function handleDeleteClick(id) {
        const removeItem = todos.filter((todo) => {
            return todo.id !== id;
        });
        setTodos(removeItem);
    }

    function handleUpdateTodo(id, updatedTodo) {
        const updatedItem = todos.map((todo) => {
            return todo.id === id ? updatedTodo : todo;
        });
        setIsEditing(false);
        setTodos(updatedItem);
    }

    function handleEditClick(todo) {
        setIsEditing(true);
        setCurrentTodo({ ...todo });
    }

    return (
        <div >
            {isEditing ? (
                <form onSubmit={handleEditFormSubmit}>
                    <h2>Edit Project</h2>
                    <label htmlFor="editTodo">Edit todo: </label>
                    <input
                        name="editTodo"
                        type="text"
                        placeholder="Edit Project"
                        value={currentTodo.text}
                        onChange={handleEditInputChange}
                    />
                    <button type="submit">Update</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <form onSubmit={handleFormSubmit}>
                    <h2>Add Project</h2>
                    <label className={'todo__lable'} htmlFor="todo">Add project: </label>
                    <input
                        className={'add__project__input'}
                        name="todo"
                        type="text"
                        placeholder="Create a new Project"
                        value={todo}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className={'addTask'}>+</button>
                </form>
            )}
            <ul className="project__block">
                {todos.map((todo) => (
                    <li key={todo.id} className={'project__list'}>
                        {todo.text}
                         <button className={'project__btn'} onClick={() => handleEditClick(todo)}>Edit</button>
                        <button className={'project__btn'} onClick={() => handleDeleteClick(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Projects