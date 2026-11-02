// Get HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Display tasks
function renderTasks(tasks) {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty-message">No tasks found. Add a task to get started!</li>';
        return;
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Temporary task storage
let tasks = [];

// Handle Add Task button
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        errorMessage.textContent = 'Please enter a task.';
        errorMessage.classList.remove('hidden');
        return;
    }

    errorMessage.classList.add('hidden');

    tasks.push(taskText);

    renderTasks(tasks);

    taskInput.value = '';
    taskInput.focus();
});

// Display initial empty message
renderTasks(tasks);
