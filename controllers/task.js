const Task = require('../models/task');

async function createTask(taskName, deadline) {
    await Task.create({ task: taskName, deadline });
}

async function deleteTask(taskId) {
    await Task.findByIdAndDelete(taskId);
}

async function findAndUpdateTask(id, completedStatus) {
    await Task.findByIdAndUpdate(id, { completed: completedStatus });
}

module.exports = { createTask, deleteTask, findAndUpdateTask };
