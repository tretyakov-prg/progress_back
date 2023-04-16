var TaskService = require('../services/task.service');

exports.getTasks = async (req, res) => {
    try {
        var task = await TaskService.getTasks()
        return res.status(200).json({ status: 200, data: task, message: "List all Task" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.getStatus = async (req, res) => {
    try {
        var status = await TaskService.getStatus()
        return res.status(200).json({ status: 200, data: status, message: "List all Status" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.getTask = async (req, res) => {
    try {
        var user = await TaskService.getTask(req,res);
        if (user === 0) 
        {
            return res.status(500).json({ status: 500, data: user, message: "Error Task by id" });
        }
        else
        {
            return res.status(200).json({ status: 200, data: user, message: "Task by id" });
        }
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.setTask = async (req,res) => {
    try {
        var task = await TaskService.setTasks(req,res);

        return res.status(200).json({ status: 200, data: task, message: "Add Task" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.updateTask = async (req,res) => {
    try {
        var task = await TaskService.updateTask(req,res);

        return res.status(200).json({ status: 200, data: task, message: "Update Task status" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.deleteTask = async (req,res) => {
    try {
        var user = await TaskService.deleteTask(req,res);

        return res.status(200).json({ status: 200, data: user, message: "Delete Task by ID" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}