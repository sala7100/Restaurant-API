const {required} = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    meal: {type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true},
    quantity: {type: Number, required: true, min: 1},
    totalPrice: {type: Number, required: true},
    status: {type: String, enum: ['pending', 'completed', 'canceled'], default: 'pending'}
    },
    {
    timestamps: true,
  });

module.exports = mongoose.model('Order', orderSchema);