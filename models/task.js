const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})


const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
