const express = require("express");
const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  bio: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  age: Joi.number().optional(),
  image: Joi.any(), 
  role: Joi.string().valid('user', 'admin').required()
});

const updateUserSchema = createUserSchema.fork(
  ["name", "bio", "password", "age","image","role","email"],
  (schema) => schema.optional()
);

module.exports = {
  createUserSchema,
  updateUserSchema,
};
