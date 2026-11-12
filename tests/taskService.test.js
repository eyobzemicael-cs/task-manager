const test = require('node:test');
const assert = require('node:assert/strict');
const { TaskService } = require('../taskService.js');

function createFakeStorage(initialData = null) {
    const store = {};
    if (initialData !== null) {
        store.tasks = JSON.stringify(initialData);
    }
    return {
        getItem(key) {
            return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
        },
        setItem(key, value) {
            store[key] = value;
        }
    };
}

test('US-01/US-04: addTask adds a trimmed task with completed=false and saves it', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    const task = service.addTask('  Finish Sprint 2 SOLID refactor  ');
    assert.equal(task.text, 'Finish Sprint 2 SOLID refactor');
    assert.equal(task.completed, false);
    assert.equal(service.getAllTasks().length, 1);
});

test('US-01: addTask rejects empty or whitespace-only input', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    assert.throws(() => service.addTask('   '), /Task title cannot be empty/);
    assert.equal(service.getAllTasks().length, 0);
});

test('US-04: toggleTaskCompletion marks an active task as completed and persists', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);
    const created = service.addTask('Write unit tests');

    const updated = service.toggleTaskCompletion(created.id);
    assert.equal(updated.completed, true);

    const reloadedService = new TaskService(storage);
    assert.equal(reloadedService.getAllTasks()[0].completed, true);
});

test('US-04: toggleTaskCompletion toggles a completed task back to active', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);
    const created = service.addTask('Review pull request');

    service.toggleTaskCompletion(created.id);
    const toggledBack = service.toggleTaskCompletion(created.id);
    assert.equal(toggledBack.completed, false);
});

test('US-04: toggleTaskCompletion throws an error for an invalid task ID', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    assert.throws(() => service.toggleTaskCompletion('non-existent-id'), /Task not found/);
});

test('US-05: getFilteredTasks returns all, active, and completed tasks accurately', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    const t1 = service.addTask('Active task 1');
    const t2 = service.addTask('Completed task 2');
    service.toggleTaskCompletion(t2.id);

    assert.equal(service.getFilteredTasks('all').length, 2);
    assert.deepEqual(service.getFilteredTasks('active').map((t) => t.id), [t1.id]);
    assert.deepEqual(service.getFilteredTasks('completed').map((t) => t.id), [t2.id]);
});

test('US-05: getFilteredTasks rejects an unsupported filter name', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    assert.throws(() => service.getFilteredTasks('archived'), /Invalid filter/);
});

test('US-06: deleteTask removes an existing task and persists changes', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    const t1 = service.addTask('Task to keep');
    const t2 = service.addTask('Task to delete');

    const deleted = service.deleteTask(t2.id);
    assert.equal(deleted.id, t2.id);
    assert.equal(service.getAllTasks().length, 1);

    const reloadedService = new TaskService(storage);
    assert.deepEqual(reloadedService.getAllTasks().map((t) => t.id), [t1.id]);
});

test('US-06: deleteTask throws an error when task ID does not exist', () => {
    const storage = createFakeStorage();
    const service = new TaskService(storage);

    assert.throws(() => service.deleteTask('missing-id'), /Task not found/);
});
