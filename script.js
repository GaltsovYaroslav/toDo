const addTask = document.getElementById('add-task');
const deskTaskInput = document.getElementById('description-task');
const todoList = document.querySelector('.todo-list');
const btnAll = document.getElementById('all');
const btnAct = document.getElementById('act');
const btnComp = document.getElementById('comp');

const FILTER_TYPE_ALL = 'all';
const FILTER_TYPE_ACTIVE = 'act';
const FILTER_TYPE_COMPLETED= 'comp';

let currentTab = 'all';
let tasks = [];
let todoItemElems = [];

const getTodoTemlate = (task, index) => {
    return `
        <li class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttoms">
                <input onclick="completeTask(${index})" class="button-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="button-delete">Delete</button>
            </div>
            <div class="task-line"></div>
        </li>
    `
};

const filterTasks = (currentTab)  => { 
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false );
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true );
        if (currentTab === "all") {
            render(tasks); 
        } 
        if (currentTab === "act") {
                render(activeTasks);                       
        }
        if (currentTab === "comp") {
            render(completedTasks);
        }        
};

const render = (arrayForRender)  => {  //Переименовать функцию в render 
    todoList.innerHTML = '';
    if (!arrayForRender.length) return; 
    else {
        arrayForRender.forEach((item, index) => {
          todoList.innerHTML += getTodoTemlate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');  
    }
};

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) { /* Проверка выполнения */
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    filterTasks(currentTab);
};

addTask.addEventListener('click', () => {
    const task = {
        description: deskTaskInput.value, 
        completed: false,
        id: Math.random(),
    }
    tasks.push(task);
    filterTasks(currentTab);
    deskTaskInput.value = ''; 
});

btnAll.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_ALL);
});

btnAct.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_ACTIVE);
});

btnComp.addEventListener('click', () => {
    filterTasks(FILTER_TYPE_COMPLETED);
});

const deleteTask = index => { //Удаление задач из списка
    tasks.splice(index, 1);
    // updateLocal();
    filterTasks(currentTab);
};