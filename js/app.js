const main = ((document) => {
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);
        //we get only own properties
        for (let prop in props) {
            if (!props.hasOwnProperty(prop)) continue;
            element[prop] = props[prop]; //element.type = props['type'];
        }

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                element.appendChild(child);
            });
        }
        return element;
    }

    function createTodoItem(title) {
        const checkbox = createElement('input', {
            type: 'checkbox',
            className: 'checkbox'
        });

        const label = createElement('label', {
            className: 'title'
        }, title);

        const editInput = createElement('input', {
            type: 'text',
            className: 'textfield'
        });

        const editButton = createElement('button', {
            className: 'edit'
        }, 'Change');

        const deleteButton = createElement('button', {
            className: 'delete'
        }, 'Delete');

        const listItem = createElement('li', {
            className: 'todo-item'
        }, checkbox, label, editInput, editButton, deleteButton);

        bindEvents(listItem);
        return listItem;

    }

    //use events delegation
    function bindEvents(todoItem) {
        todoItem.addEventListener('change', toggleTodoItem);
        todoItem.addEventListener('click', editTodoItem);
        todoItem.addEventListener('click', deleteTodoItem);
    }

    function addTodoItem(event) {
        //canceled send operation by default
        event.preventDefault();

        if (addInput.value === '') return alert("Nesessary add task name");
        
        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
        if (todoList.children.length) {
            message.classList.add('hide');
        }
    }

    //use restructuring, instead event we use {target} from event object
    function toggleTodoItem({ target }) {
        if (target.className != 'checkbox') return;
        const listItem = target.parentNode;
        listItem.classList.toggle('completed');
    }


    function editTodoItem({ target }) {
        if (target.className != 'edit') return;
        const listItem = target.parentNode;
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            title.innerText = editInput.value;
            target.innerText = 'Change';
        } else {
            editInput.value = title.innerText;
            target.innerText = 'Save';

        }
        listItem.classList.toggle('editing');
    }


    function deleteTodoItem({ target }) {
        if (target.className != 'delete') return;
        
        const listItem = target.parentNode;
        todoList.removeChild(listItem);
        if (!todoList.children.length) {
            message.classList.remove('hide');
        }
    }

    const todoForm = document.querySelector('#todo-form');
    const addInput = document.querySelector('#add-input');
    const todoList = document.querySelector('#todo-list');
    const todoItems = document.querySelectorAll('.todo-item');
    const message = document.querySelector('.todo-message');

    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach((item) => bindEvents(item))
    }

    return main;
})(document);
main();