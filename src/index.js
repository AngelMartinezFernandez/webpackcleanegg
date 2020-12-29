import "./styles.css";

import { Todo, TodoList } from "./classes";
import { crearTodoHtml } from "./js/componentes";

// import {Todo} from './classes/todo.class.js';
// import {TodoList} from './classes/todo-list.class.js';

export const todoList = new TodoList();

todoList.todos.forEach(crearTodoHtml);


// todoList.todos.forEach(todo => crearTodoHtml(todo));

// console.log(todoList.todos);

// const tarea = new Todo("Comprar un Flip Off Finger");

// todoList.nuevoTodo(tarea);

// crearTodoHtml(tarea);

// localStorage.setItem("mi-key", "ABC123");
