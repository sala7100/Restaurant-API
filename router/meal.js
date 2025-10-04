const express = require('express');
const router = express.Router();
const res = require('../middleware/res');
const auth = require('../middleware/auth');
const{
    getAllMeals,
    getMealByid,//search
    addMeal,//admin
    updateMeal,//admin
    deleteMeal,

}= require('../controllers/meal');

const{
    addMealSchema,
    updateMealSchema,
}= require('../utils/validation/meal');

const validate = require('../middleware/validate');

const {
    uploadLocal,
  uploadCDN
}= require('../middleware/multer-upload');

const uploadImageKit = require("../middleware/uplaodImageKit");

router.get('/', getAllMeals);
router.get('/:id', getMealByid);
router.post('/',auth,res("admin"),uploadLocal.single('image'),validate(addMealSchema), addMeal);
router.put('/:id',auth,res("admin"),validate(updateMealSchema), updateMeal);
router.delete('/:id',auth,res("admin"), deleteMeal);

module.exports = router;



