function createTodoItem (title) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    
    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.innerText = 'Change';
    editButton.className = 'edit';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.className = 'delete';

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    console.log(listItem);
    return listItem;

}
function addTodoItem (event) {
    event.preventDefault();
    
    if(addInput.value === '') return alert("Nesessary add task name");

    const listItem = createTodoItem(addInput.value)
}

const todoForm = document.querySelector('#todo-form');
const addInput = document.querySelector('#add-input');
const todoList = document.querySelector('#todo-list');
const todoItems = document.querySelectorAll('.todo-item');


todoForm.addEventListener('submit', addTodoItem);