const Student = require('../model/student');

const path = require('path');
const fs  = require('fs');

// Retrieve and return all students from the database.
exports.findAll = (req, res) => {
  Student.find()
  .then(students => {
    res.send(students);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something went wrong while getting list of students."
    });
  });
};

// Create and Save a new students
exports.create =  (req, res , next) => {
  
  // Validate request
  if(!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
      
    });
  }
  // Create a new students
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    img: req.files[0].filename,  //update this
  });
  // Save student in the database
  student.save()
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Something went wrong while creating new student."
    });
  });
};

// Find a single student with a id
exports.findOne = (req, res) => {
  Student.findById(req.params.id)
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    res.send(student);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Error getting student with id " + req.params.id
    });
  });
};

// Update a student identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
      message: "Please fill all required field"
    });
  }
  // Find student and update it with the request body
  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    img: req.files[0].filename,
  }, {new: true})
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    res.send(student);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    
    return res.status(500).send({
      message: "Error updating user with id " + req.params.id
    });
  });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  Student.findByIdAndRemove(req.params.id)
  .then(student => {
    if(!student) {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    fs.unlinkSync('uploads/'+ student.img);
    res.send({message: "student deleted successfully!"});
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "student not found with id " + req.params.id
      });
    }
    return res.status(500).send({
      message: "Could not delete user with id " + req.params.id
    });
  });
};