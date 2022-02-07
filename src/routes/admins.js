const express = require('express')
const router = express.Router();

const adminController = require('../controllers/admins');
const Auth = require('../middlewares/auth');

// Retrieve all student
router.get('/admins', Auth.verifyTokenAuth, adminController.findAll);
// Create a new student
router.post('/admins', Auth.verifyTokenAuth, adminController.create);
// Retrieve a single student with id
router.get('/admins/:id', Auth.verifyTokenAuth, adminController.findOne);
// Update a student with id
router.put('/admins/:id', Auth.verifyTokenAuth, adminController.update);
// Delete a student with id
router.delete('/admins/:id', Auth.verifyTokenAuth, adminController.delete);

module.exports = router