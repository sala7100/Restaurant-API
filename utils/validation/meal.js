const express = require('express');
const joi = require('joi');

const addMealSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    image: joi.any(),
    category: joi.string().valid('breakfast', 'lunch', 'dinner').required()
});

const updateMealSchema = addMealSchema.fork(
    ['name', 'description', 'price', 'image', 'category'],
    (schema) => schema.optional()
);

module.exports = {
    addMealSchema,
    updateMealSchema,
};