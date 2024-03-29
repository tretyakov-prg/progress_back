const jwt = require('jsonwebtoken');
var db = require('../models/mysql.model');
const secret = process.env.SECRET || "Days17";

exports.getJWT = (req) => {
    try {
        return jwt.verify(req.body.token, secret, function (err, data) {
            if (err) {
                return {error : "error", mesage: err};
            }
            else
            {
                return data;
            }
          })
    } catch (error) {
        throw new Error('Failed to get JWT');
    }
}

exports.setJWT = async(req) => {
    const {email,password} = req.body;
    try {    
        var sql_status = 'SELECT * FROM users WHERE email = ?';
        var user = await db.query(sql_status, [email]).then(result =>{return result[0]}).catch(err =>{return err});
        if(user[0]) {
            let token = jwt.sign({email: user[0].email}, secret, {expiresIn: '1h'});
            var sql_token_set = 'UPDATE users SET token = ? WHERE email = ?';
            await db.query(sql_token_set, [token, email]).then(result =>{return console.log('\x1b[32m' ,result[0].info)}).catch(err =>{console.log("\x1b[31m",err)});
            return token;
        } 
        
    } catch (error) {
        throw new Error('Failed to set JWT');
    }
}

exports.regJWT = async(req) => {
    const {username, email, password} = req.body;
    try {    
        //var sql_status = 'SELECT * FROM progressdb.task_status';
        //var dacols = await db.query(sql_status).then(result =>{return result[0]}).catch(err =>{console.log(err)});
        return "Create User!"
        // let token = jwt.sign({
        //     email: req.body.email,
        //     password: req.body.password
        // }, secret, {expiresIn: 60 * 60})
        // return token;
    } catch (error) {
        throw new Error('Failed to reg JWT');
    }
}

exports.getTest = (req) => {
    try {
        return "Это тест"
    } catch (error) {
        throw new Error('Failed to get test JWT');
    }
}