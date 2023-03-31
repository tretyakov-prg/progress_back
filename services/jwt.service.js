const jwt = require('jsonwebtoken')
const secret = process.env.SECRET || "Days17"

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

exports.setJWT = (req) => {
    try {    
        let token = jwt.sign({
            user: req.body.name,
            email: req.body.email
        }, secret, {expiresIn: 60 * 60})
        return token;
    } catch (error) {
        throw new Error('Failed to set JWT');
    }
}

exports.getTest = (req) => {
    try {
        return "Это тест"
    } catch (error) {
        throw new Error('Failed to get JWT');
    }
}