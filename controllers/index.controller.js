var IndexService = require('../services/index.service')    

exports.getUsers = async (req, res) => {
    try {
        var users = await IndexService.getUsers()
        console.log(users)
        return res.status(200).json({ status: 200, data: users, message: "List all Users" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        var user = await IndexService.getUser(req,res);
        if (user === 0) 
        {
            return res.status(500).json({ status: 200, data: user, message: "User by id" });
        }
        else
        {
            return res.status(200).json({ status: 200, data: user, message: "User by id" });
        }
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.setUser = async (req,res) => {
    try {
        var user = await IndexService.setUser(req,res);

        return res.status(200).json({ status: 200, data: user, message: "Add User" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.updateUser = async (req,res) => {
    try {
        var user = await IndexService.updateUser(req,res);

        return res.status(200).json({ status: 200, data: user, message: "Update User" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.deleteUser = async (req,res) => {
    try {
        var user = await IndexService.deleteUser(req,res);

        return res.status(200).json({ status: 200, data: user, message: "Delete User" });
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}