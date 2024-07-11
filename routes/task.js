const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { createTask, deleteTask, findAndUpdateTask } = require('../controllers/task');

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({});
        const completedTasks = tasks.filter(task => task.completed);
        const pendingTasks = tasks.filter(task => !task.completed);
        res.render('home', { completedTasks, pendingTasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { completedStatus } = req.body;
    try {
        await findAndUpdateTask(id, completedStatus === 'true'); 
        res.redirect('/home');
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deleteTask(id);
        res.redirect('/home');
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const { task, deadlineDate, deadlineTime } = req.body;
    const deadline = new Date(`${deadlineDate}T${deadlineTime}`);
    try {
        await createTask(task, deadline);
        res.redirect('/home');
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
