function createElement (tag, props, ...children) {
    const element = document.createElement(tag);
    
    for(let prop in props) {
        if(!props.hasOwnProperty(prop)) continue;
        element[prop] = props[prop]; //element.type = props['type'];
    }

    if (children.length > 0) {
        children.forEach(child => {
            if(typeof child === 'string') {
                child = document.createTextNode(child);
            }
            element.appendChild(child);
        });
    }
    return element;
}

function createTodoItem (title) {
    const checkbox = createElement('input', { type: 'checkbox', className:'checkbox' });
    
    const label = createElement('label', { className: 'title' }, title);

    const editInput = createElement('input', { type: 'text', className: 'textfield' });

    const editButton = createElement('button', { className: 'edit' }, 'Change');

    const deleteButton = createElement('button', { className: 'delete' }, 'Delete');

    const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    bindEvents(listItem);
    return listItem;

}
function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const deleteButton = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTodoItem);
    editButton.addEventListener('click', editTodoItem);
    deleteButton.addEventListener('click', deleteTodoItem);

}
function addTodoItem (event) {
    event.preventDefault();
    
    if(addInput.value === '') return alert("Nesessary add task name");

    const todoItem = createTodoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

//use restructuring, instead event we use {target}
function toggleTodoItem ({ target }) {
    const listItem = target.parentNode;
    listItem.classList.toggle('completed');
}

//use "this" like access to event element
function editTodoItem () {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');

    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Change';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Save';

    }
    listItem.classList.toggle('editing');
}


function deleteTodoItem () {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
}
const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');

function main () {
    todoForm.addEventListener('submit', addTodoItem);
    todoItems.forEach((item)=>bindEvents(item))
}

main();