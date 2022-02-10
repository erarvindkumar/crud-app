const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

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
})

AdminSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 5);
    }
    next();
});


module.exports = mongoose.model('Admin', AdminSchema);