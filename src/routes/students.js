const express = require('express')
const router = express.Router();

const studentController = require('../controllers/students');
const Auth = require('../middlewares/auth');

// Retrieve all student
router.get('/students', Auth.verifyTokenAuth, studentController.findAll);
// Create a new student
router.post('/students', Auth.verifyTokenAuth, studentController.create);
// Retrieve a single student with id
router.get('/students/:id', Auth.verifyTokenAuth, studentController.findOne);
// Update a student with id
router.put('/students/:id', Auth.verifyTokenAuth, studentController.update);
// Delete a student with id
router.delete('/students/:id', Auth.verifyTokenAuth, studentController.delete);

module.exports = router