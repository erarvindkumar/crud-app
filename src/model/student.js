const mongoose = require('mongoose');
const validator = require('validator');

const StudentSchema = mongoose.Schema({
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
    phone: {
        type: Number,
        required: true,
        min: 10
    },
    img: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);

