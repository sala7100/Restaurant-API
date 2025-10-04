const express = require('express');
const router = express.Router();

const{
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}= require('../controllers/user');

const {
    createUserSchema,
    updateUserSchema
}= require('../utils/validation/user');

const validate = require('../middleware/validate');

const {
    uploadLocal,
  uploadCDN
}= require('../middleware/multer-upload');

const uploadImageKit = require("../middleware/uplaodImageKit");
const res = require('../middleware/res');
const auth = require('../middleware/auth');

router.post(
    '/',
     uploadLocal.single('image'), 
     validate(createUserSchema), 
     createUser,
     res("admin"),
     auth
);
router.get('/',res("admin"),auth, getAllUsers);
router.get('/:id',res("admin"),auth, getUserById);
router.put('/:id',res("admin"),auth, updateUser);
router.delete('/:id',res("admin"),auth, deleteUser);

module.exports = router;