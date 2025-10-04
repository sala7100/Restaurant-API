const {required} = require('joi');
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: {type: String,required: true ,minlength:3, unique:true},
    description: {type: String,required: true},
    price: {type: Number,required: true},
    category: {type: String,required: true},
    image: {type: String,required: false}   
    },
    {
    timestamps: true,
  });

module.exports = mongoose.model('Meal', mealSchema);