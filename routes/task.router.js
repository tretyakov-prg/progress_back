var express = require('express');
var router = express.Router();

var TaskController = require('../controllers/task.controller');

router.get('/',         TaskController.getUsers);
router.get('/:id',      TaskController.getUser);
router.post('/',        TaskController.setUser);
router.put('/',         TaskController.updateUser);
router.delete('/:id',   TaskController.deleteUser);

module.exports = router;