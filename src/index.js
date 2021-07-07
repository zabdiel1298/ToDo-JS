import {Todo,TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';
import './styles.css';


export const todoList =new TodoList();
todoList.todos.forEach(todo => crearTodoHtml(todo));
// const tarea = new Todo('aprender Javascript');

// todoList.nuevoTodo(tarea);


// console.log(todoList);
// crearTodoHtml(tarea);