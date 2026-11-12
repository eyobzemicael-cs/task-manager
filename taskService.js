class TaskService {
    constructor(storage, storageKey = 'tasks') {
        this.storage = storage;
        this.storageKey = storageKey;
        this.tasks = this._loadTasks();
    }

    _loadTasks() {
        const raw = this.storage.getItem(this.storageKey);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return parsed.map((item, index) => {
            if (typeof item === 'string') {
                return { id: `legacy-${index}-${Date.now()}`, text: item, completed: false };
            }
            return item;
        });
    }

    _saveTasks() {
        this.storage.setItem(this.storageKey, JSON.stringify(this.tasks));
    }

    getAllTasks() {
        return [...this.tasks];
    }

    addTask(rawText) {
        const text = typeof rawText === 'string' ? rawText.trim() : '';
        if (text === '') {
            throw new Error('Task title cannot be empty or only spaces.');
        }

        const newTask = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            text,
            completed: false
        };

        this.tasks.push(newTask);
        this._saveTasks();
        return newTask;
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (!task) {
            throw new Error('Task not found.');
        }

        task.completed = !task.completed;
        this._saveTasks();
        return task;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TaskService };
}
