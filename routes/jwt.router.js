var express = require('express');
const auth = require("../middleware/auth");
var router = express.Router();

var JWTController = require('../controllers/jwt.controller')

router.post('/get',     JWTController.getJWT);
router.get('/gettest', auth,    JWTController.getTest);
router.post('/set',    JWTController.setJWT);
router.post('/reg',    JWTController.regJWT);

module.exports = router;