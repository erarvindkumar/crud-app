const mongoose = require('mongoose');
const validator = require('validator');

const AdminSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 25
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true
      }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);