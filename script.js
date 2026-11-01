javascript
// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');

// Load tasks from localStorage or initialize empty array (US-02)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the screen (US-03)
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks found. Add a task to get started!</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Handle Form Submission (US-01)
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page reload
    
    const taskText = taskInput.value.trim(); // Trim whitespace

    // Validation Check (US-01)
    if (taskText === '') {
        errorMessage.textContent = 'Error: Task title cannot be empty or only spaces.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Clear error message if validation passes
    errorMessage.classList.add('hidden');

    // Add task to array, save, and update UI
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save (US-02)
    
    taskInput.value = ''; // Clear input field (US-01)
    renderTasks(); // Dynamic refresh (US-03)
});

// Initial load rendering
renderTasks();