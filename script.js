// Get HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Inject browser localStorage into TaskService (Dependency Inversion)
const taskService = new TaskService(window.localStorage);

// Display tasks on the screen (Single Responsibility: DOM rendering only)
function renderTasks() {
    taskList.innerHTML = '';
    const tasks = taskService.getAllTasks();

    if (tasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty-message">No tasks found. Add a task to get started!</li>';
        return;
    }

    tasks.forEach(function(task) {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');

        const leftContainer = document.createElement('div');
        leftContainer.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark "${task.text}" as completed`);

        checkbox.addEventListener('change', function() {
            taskService.toggleTaskCompletion(task.id);
            renderTasks();
        });

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        leftContainer.appendChild(checkbox);
        leftContainer.appendChild(span);
        li.appendChild(leftContainer);
        taskList.appendChild(li);
    });
}

// Handle Add Task form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    try {
        taskService.addTask(taskInput.value);
        errorMessage.classList.add('hidden');
        taskInput.value = '';
        taskInput.focus();
        renderTasks();
    } catch (error) {
        errorMessage.textContent = `Error: ${error.message}`;
        errorMessage.classList.remove('hidden');
    }
});

// Display saved tasks when application loads
renderTasks();
