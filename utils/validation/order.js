const express = require("express");
const Joi = require("joi");

const createOrderSchema = Joi.object({
  user: Joi.string().required(),
  meal: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
    totalPrice: Joi.number(),
  status: Joi.string().valid('pending', 'completed', 'canceled').default('pending')
});

module.exports = {
  createOrderSchema
};