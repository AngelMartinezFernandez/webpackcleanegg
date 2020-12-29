import { Todo, TodoList } from "../classes";
import {todoList} from '../index';

//REFERENCIAS EN EL HTML
const divTodoList = document.querySelector(".todo-list");
const txtInput = document.querySelector(".new-todo");
const delCompBtn = document.querySelector(".clear-completed");
const ulFilters = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtros');






export const crearTodoHtml = (todo) =>{

    const htmlTodo = `
    <li class="${(todo.completado) ? 'completed': ''}" data-id="${todo.id}">
		<div class="view">
			<input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
    		<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;


}

//EVENTOS
txtInput.addEventListener('keyup', (event) =>{
  if (event.keyCode === 13 && txtInput.value.length>0){
    const nuevoTodo = new Todo (txtInput.value);
    todoList.nuevoTodo(nuevoTodo);

    crearTodoHtml(nuevoTodo);
    txtInput.value = "";

  }
});

divTodoList.addEventListener('click', (Event) => {

    const nombreElemento = Event.target.localName;
    const todoElemento   = Event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    const ulFilters      = document.querySelector('.filters');

    // console.log(nombreElemento);
    // console.log(todoElemento);
    // console.log(todoId);

    if ( nombreElemento.includes('input')){
      todoList.marcarCompletado(todoId);
      todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){

      todoList.eliminarTodo(todoId);
      divTodoList.removeChild (todoElemento);
    }

    
});

delCompBtn.addEventListener('click', () =>{
  
  todoList.eliminarCompletados();
  for (let i= divTodoList.children.length-1; i>=0;i-- ){
    const elemento = divTodoList.children[i];
    
    if(elemento.classList.contains('completed')){
      divTodoList.removeChild(elemento);
    };
  };

});

ulFilters.addEventListener('click', (Event)=>{

  const filtro = Event.target.text;
  if(!filtro){return;}

  anchorFiltros.forEach(elem =>elem.classList.remove('selected'));
  Event.target.classList.add('selected');

  for (const iterator of divTodoList.children) {

    iterator.classList.remove('hidden');
    const completado = iterator.classList.contains('completed');
    switch(filtro){
      case 'Pendientes':
        if(completado){
          iterator.classList.add('hidden');
        }
        break;
      case 'Completados':
        if(!completado){
          iterator.classList.add('hidden');
        }
        break;
    }
    
  }

});