const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');
const filterButtons = document.querySelectorAll('.filter-btn');

const taskService = new TaskService(window.localStorage);
let currentFilter = 'all';

function getEmptyStateMessage(filterName) {
    if (filterName === 'active') return 'No active tasks remaining.';
    if (filterName === 'completed') return 'No completed tasks yet.';
    return 'No tasks found. Add a task to get started!';
}

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = taskService.getFilteredTasks(currentFilter);

    if (tasks.length === 0) {
        taskList.innerHTML = `<li class="empty-message">${getEmptyStateMessage(currentFilter)}</li>`;
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

filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        currentFilter = button.dataset.filter;
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        renderTasks();
    });
});

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

renderTasks();
