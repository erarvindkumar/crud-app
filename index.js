const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

// create express app
const app = express();
const SECRET = "ruiu565";

// Setup server port
const port = process.env.PORT || 4000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))


// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
require('./config/db.config.js');

// Require Users routes
const studentRoutes = require('./src/routes/students.js')
const adminRoutes = require('./src/routes/admins.js');

const Admin = require('./src/model/admin.js');

// using as middleware
app.use('/api', studentRoutes);
app.use('/api', adminRoutes);
// define a root/default route
app.post("/api/login", (req, res) => {
  if (!req.body.email) {
    return res.status(401).json({ message: 'Authentication failed. Admin email required.' });
  }
  if(!req.body.password){
    return res.status(401).json({ message: 'Authentication failed. Admin password required.' });
 }
  Admin.find({ email: req.body.email })
    .then(admin => {
      if (!admin) {
        return res.status(404).send({
          message: "Authentication failed. Admin not found."
        });
      }
      if(admin.password == req.body.password){
       return res.status(404).send({
         message: "Authentication failed. Wrong password."
       });
     }
      //admin = admin[0];
      const token = jwt.sign({ data: admin._id }, SECRET, { expiresIn: 100 * 50 });
      res.json({ success: true, token: token });
    }).catch(err => {
      console.log(err);
      return res.status(500).send({
        message: "Error getting admin "
      });
    });
});

app.get('/', (req, res) => {
  res.send("Hello World");
});

// listen for requests
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});