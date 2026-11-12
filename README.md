# Task Manager

## Author
- Eyob Zemicael

## Purpose
A web-based Task Manager built to log, view, complete, filter, and delete daily tasks. Sprint 2 expands the Sprint 1 foundation with interactive task management, SOLID architecture (`TaskService` with dependency injection and Open/Closed filter strategies), and automated unit tests.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- Node.js built-in test runner (`node:test`)

## Prerequisites
- Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
- **Node.js (v18+)** to run the automated test suite from the terminal.

## Installation & Configuration
No external npm packages or environment variables are required.

1. Clone this repository onto your local machine:
   ```bash
   git clone https://github.com
   cd task-manager
   ```

## Running the Application
1. Navigate into the root project directory.
2. Open `index.html` directly in your web browser (or run `open index.html` on macOS).

## Running Automated Tests
From the root project directory (`task-manager/`), run:
```bash
npm test
```
This executes all unit tests in `tests/taskService.test.js` using Node's built-in test runner.

## Trying the Functionality
### Sprint 1 Core Features
1. Type a task title into the text box and click **Add Task** to render it immediately in your list.
2. Submit an empty or whitespace-only input to observe validation error handling.
3. Reload the browser page to confirm tasks persist via `localStorage`.

### Sprint 2 New Features
1. **Mark Tasks Completed (US-04):** Click the checkbox next to any task to mark it completed (highlighted in green with strikethrough text) or uncheck it to return it to active status. Reload the page to confirm completion status persists.
2. **Filter Tasks by Status (US-05):** Click **All**, **Active**, or **Completed** above the task list to filter displayed tasks dynamically.
3. **Delete Tasks (US-06):** Click the red **Delete** button on any task row to remove it permanently from the list and `localStorage`.

## Known Limitations
- Data is stored locally in the browser's `localStorage`, so tasks do not sync across different browsers or devices.
- Deleting a task happens immediately without an undo prompt.
