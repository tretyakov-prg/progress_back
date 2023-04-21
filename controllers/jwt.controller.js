var JWTService = require('../services/jwt.service')    

exports.getJWT = async (req, res) => {
    try {
        var users = await JWTService.getJWT(req)
        if(!users.error)
        {
            return res.status(200).json({ status: 200, data: users, message: "Get jwt" });
        }
        else
        {
            return res.status(401).json({ status: 401, data: users, message: "Error jwt" });
        }
        
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.setJWT = async (req, res) => {
    try {
        var token = await JWTService.setJWT(req)
        return res.status(200).json({ status: 200, accessToken: token, message: "Set jwt" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Login error: " + e.message });
    }
}

exports.regJWT = async (req, res) => {
    try {
        var token = await JWTService.regJWT(req)
        return res.status(200).json({ status: 200, accessToken: token, message: "Reg jwt" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}

exports.getTest = async (req, res) => {
    try {
        var users = await JWTService.getTest(req)
        return res.status(200).json({ status: 200, data: users, message: "Get Test jwt" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: "Control: " + e.message });
    }
}