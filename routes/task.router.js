var express = require('express');
var router = express.Router();

var TaskController = require('../controllers/task.controller');

router.get('/',         TaskController.getTasks);
router.get('/status',  TaskController.getStatus);
router.get('/:guid',    TaskController.getTask);
router.post('/',        TaskController.setTask);
router.put('/',         TaskController.updateTask);
router.delete('/:id',   TaskController.deleteTask);

module.exports = router;