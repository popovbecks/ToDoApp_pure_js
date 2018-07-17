function createTodoItem (title) {
    const 
}
function addTodoItem (event) {
    event.preventDefault();
    
    if(addInput.value === '') return alert("Nesessary add task name");

    const listItem = createTodoItem(addInpu.value)
}

const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');


todoForm.addEventListener('submit', addTodoItem);