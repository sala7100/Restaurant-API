const {required} = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String,required: true ,minlength:3},
    email: {type: String,required: true,unique:true},
    password: {type: String,required: true,minlength:8},
    role: {type: String,enum:['user','admin'],default:'user'},
    bio: {type: String,required: false},
    age: {type: Number,required: false},
    image: {type: String,required: false}
    },
    {
    timestamps: true,
  });

module.exports = mongoose.model('User', userSchema);