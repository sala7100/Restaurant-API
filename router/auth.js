const express = require('express');
const router = express.Router();

const{
    login,
    signup
}= require('../controllers/auth');

const{
    signupSchema,
    loginSchema,
}= require('../utils/validation/auth');
const validate = require('../middleware/validate');

router.post('/signup',validate(signupSchema), signup);
router.post('/login',validate(loginSchema), login);

module.exports = router;