const Joi=require('joi');

const signupSchema=Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    bio:Joi.string().min(3).optional(),
    age:Joi.number().optional(),
    image:Joi.any()
});

const loginSchema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).required(),
});

module.exports={
    signupSchema,
    loginSchema,
};