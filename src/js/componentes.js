import {Todo} from '../classes';
import {todoList} from '../index';
//referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltro = document.querySelectorAll('.filtro')
export const crearTodoHtml=(todo)=>{
    const htmlTodo=`
        <li class="${(todo.completado)? 'completed':''}" data-id="${todo.id}">
						<div class="view">
							<input class="toggle" type="${(todo.completado)? 'checked':''}" checked>
							<label>${todo.tarea}</label>
							<button class="destroy"></button>
						</div>
						<input class="edit" value="Create a TodoMVC template">
		</li>`;

        const div= document.createElement('div');
        div.innerHTML=htmlTodo;
        divTodoList.append(div.firstElementChild);
        divTodoList.append(div);
        return div;
}
//Eventos
txtInput.addEventListener('keyup',(event)=>{
    if(event.keyCode===13 && txtInput.value.length > 0){
        console.log(txtInput.value);
        const nuevoTodo=new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        txtInput.value='';
    }
});
divTodoList.addEventListener('click',(event)=>{
    const nombreElemento = event.target.localName;
    const todoElemento=event.target.parentElement.parentElement;
    const todoID =todoElemento.getAttribute('data-id');
    if(nombreElemento.includes('input')){
        todoList.marcarCompletado(todoID);
        todoElemento.classList.toggle('completed');
    }else if(nombreElemento.includes('button')){
        todoList.eliminarTodo(todoID);
        divTodoList.removeChild(todoElemento);
    }
    console.log(todoList);
});
btnBorrar.addEventListener('click',()=>{
    todoList.eliminarCompletados();
    for(let i=divTodoList.children.length - 1;i>=0;i--){
        const elemento=divTodoList.children[i];
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click',(event)=>{
    const filtro=event.target.text;
    if(!filtro) return;
    anchorFiltro.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');


    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado=elemento.classList.contains('completed');
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }

    }
});