var express = require('express');
var router = express.Router();

var IndexController = require('../controllers/index.controller')

router.get('/',         IndexController.getUsers);
router.get('/:id',      IndexController.getUser);
router.post('/',        IndexController.setUser);
router.put('/',         IndexController.updateUser);
router.delete('/:id',   IndexController.deleteUser);

module.exports = router;