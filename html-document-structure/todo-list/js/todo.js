const todoList = document.querySelector('.todo-list');
const doneContainer = todoList.querySelector('.done');
const undoneContainer = todoList.querySelector('.undone');
const listItems = todoList.querySelectorAll('input[type="checkbox"]');

function changeChecking() {
    const thisCheckbox = event.target;
    const thisItem = thisCheckbox.parentElement;

    if (thisCheckbox.checked) {
        doneContainer.appendChild(thisItem)
    } else {
        undoneContainer.appendChild(thisItem)
    }
}

for (let item of listItems) {
    item.addEventListener('change', changeChecking)
}