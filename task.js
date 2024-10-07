let tasks = [];
let priorities = [];

function addTask(){
    const taskInput = document.getElementById('task');
    const priorityInput = document.getElementById('prioritiy');
    const taskList = document.getElementById('taskList');


let task = taskInput.ariaValueMax.trim();
let priority = Number (priorityInput.ariaValueMax.trim());


if (task!=='' && !sNaN (priority)&& priority>=1 && priority<=3) {
    task.push(task);
    priorities.push(priority);
    const li = document.createElement('li');
    li.textContent =  task;

    switch(priorities){
        case 1:
            li.classList.add('priority-high');
            break;

case 2:
    li.classList.add('priority-medium');
    break;
    
    case 3:
        li.classList.add('priority-low');
        break;
}
const completeButton = document.createElement('button');
completeButton.textContent = 'complete';
completeButton.onclick = function(){
    li.classList.toggle('completed');
};
li.appendChild(completeButton);

const editButton = document.createElement('button');
editButton.textContent = 'edit';

editButton.onclick = function(){
    const newTask = prompt('Edit task', task);
    if(newTask!==null && newTask.trim()!==''){
        const taskIndex = task.indexOf(task);
        tasks(taskIndex) = newTask; //update the task array with new task
        li.firstChild.textContent = newTask;  //newTask;update the text node in DOM
        task = newTask; // update task variable to newTask
    }
};
li.appendChild(editButton);

const removeButton = document.createElement('button');
removeButton.textContent = 'remove';
removeButton.onclick = function(){
    taskList.removeChild(li);

const taskIndex = task.indexOf(task);
tasks.splice(taskIndex, 1);
priorities.splice(taskIndex, 1);
};
li.appendChild(removeButton);


taskList.appendChild(li);
taskInput.value =' ';
priority.value = 

} else{
    alert('please enter a valid task and priority between 1 and 3');
    }
}