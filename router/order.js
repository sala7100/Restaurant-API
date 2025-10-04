const express = require("express");
const router = express.Router();

const{
    createOrder,
    cancelOrder,
}= require('../controllers/order');

const{
    createOrderSchema,
}= require('../utils/validation/order');
const validate = require('../middleware/validate');

router.post('/',validate(createOrderSchema), createOrder);
router.delete('/:id', cancelOrder);

module.exports = router;
