/* 1 */
const addTask = document.getElementById('add-task');  /* const чтобы не изменялись во время выполнения программы */
const deskTaskInput = document.getElementById('description-task'); 
const todoList = document.querySelector('.todo-task');
let stbAll = document.querySelector('.stb-all');
let stbAct = document.querySelector('.stb-act');
let stbComp = document.querySelector('.stb-comp');



// 5
let tasks; /* Проверка на налич ие элементов массива / заданий */ 
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));



// 8
let todoItemElems = [];



/* 2 */
function Task(description) {
    this.description = description;
    this.completed = false; 
}



// 7
const createTemlate = (task, index) => {
    return ` 
        <li class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttoms">
                <input onclick="completeTask(${index})" class="button-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="button-delete">Delete</button>
            </div>
        </li>
    `
}



// 10
const filterTasks = ()  => { 
    const activeTasks = tasks.length && tasks.filter(item => item.completed == false );
    const completedTasks = tasks.length && tasks.filter(item => item.completed == true );
    if(stbAll){
        tasks = [...activeTasks,...completedTasks]; 
    } else if(stbAct) {
            tasks = [...activeTasks];                             
    } else if(stbComp) {
        tasks = [,...completedTasks];
    }
}
 


// 6
const fillHtmlList = ()  => {                  // функция для заполения листа 
    todoList.innerHTML = "";                    //очистка данных
    if(tasks.length > 0) {                         //Если массив не пустой (проверка через длину массива)
        filterTasks();                             //Фильтрация в списке. Реализовать для кнопок
        tasks.forEach((item, index) => {           //Перебор элементов массива для получения нужного
          todoList.innerHTML += createTemlate(item, index); //Кладем в функцию созданный шабллон элемента (+= добавляет к этерации, а не затирает ее) 
        });
        todoItemElems = document.querySelectorAll('.todo-item');  //Передача в документ функцииы
    }
}

// render: fillHtmlList () {        // функция для заполения листа
//     return `
//         todoList.innerHTML = "";                    
//         if(tasks.length > 0) {                         
//             filterTasks();
//             tasks.forEach((item, index) => {           
//               todoList.innerHTML += createTemlate(item, index); 
//             });
//             todoItemElems = document.querySelectorAll('.todo-item');
//         }
//     `
// }


// 6
fillHtmlList(); /* Ее наличие сохраняет на странице массив при перезагрузки (через F5) */



// 4
const updateLocal = ()  => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



// 8
const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed) { /* Проверка выполнения */
        todoItemElems[index].classList.add('checked');
    } else {
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}



// 3
addTask.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = ''; /* Очищение строки после ввода */ 
})



// 9
const deleteTask = index => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}