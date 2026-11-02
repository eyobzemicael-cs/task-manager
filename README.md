markdown
# Task Manager

## Author
* Eyob Zemicael

## Purpose
A web-based Task Manager built to log, view, and store daily tasks. This submission forms the base application structure for Sprint 1.

## Technologies Used
* HTML5
* CSS3
* Vanilla JavaScript (ES6)

## Prerequisites
* Any modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).

## Installation & Configuration
No special installation or local server environment variables are needed for this client-side application.
1. Download or clone this repository folder onto your local computer.

## Running the Application
1. Navigate into the root project directory.
2. Double-click the `index.html` file to open it directly in your web browser.

## Trying the Sprint 1 Functionality
1. Type a task title into the text box and click the **Add Task** button. You will see it render instantly in your task list.
2. Try clicking the button without entering text to observe validation enforcement.
3. Reload the browser page to confirm that your tasks persist perfectly via LocalStorage.


## 4. Manual Testing Matrix

| Test ID | User Story | Scenario Description | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | US-01 | Submit an empty task input field. | Red error message appears; no task is added to the list. | Red error message displays exactly as expected. | **PASSED** |
| **TC-02** | US-01 | Submit an input with spaces only (`"   "`). | Input is trimmed, treated as empty, and error message triggers. | Whitespace rejected; error message displays. | **PASSED** |
| **TC-03** | US-01 / 03 | Submit a valid task name (e.g., `"Complete Sprint 1"`). | Task is added to UI instantly; input field clears out cleanly. | Task shows up instantly; text box clears. | **PASSED** |
| **TC-04** | US-02 | Add a task, then reload/refresh the browser page. | The task persists and stays visible on screen after load. | Task persists perfectly from local storage. | **PASSED** |
