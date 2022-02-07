const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect('mongodb://localhost:27017/Student', {
    useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database.', err);
  process.exit();
});
