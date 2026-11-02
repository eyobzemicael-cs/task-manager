
// Get HTML elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Load saved tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on the screen
function renderTasks() {
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

// Handle Add Task form submission
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Validate task input
    if (taskText === '') {
        errorMessage.textContent =
            'Error: Task title cannot be empty or only spaces.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Clear error message
    errorMessage.classList.add('hidden');

    // Add task and save it
    tasks.push(taskText);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the application
    taskInput.value = '';
    taskInput.focus();

    renderTasks();
});

// Display saved tasks when application loads
renderTasks();
