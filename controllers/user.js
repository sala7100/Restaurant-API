const AppError = require('../utils/appError');
const User= require('../models/user');
const order = require('../models/order');

const createUser = async (req, res) => {
    const body = req.body;
    const imageUrls=Array.isArray(req.images)&& req.images.length>0?req.images[0]:null
    console.log (imageUrls)

    const newUser =await new User({
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
        bio: body.bio,
        age: body.age,
        image: imageUrls
    });
    await newUser.save();
   res.status(200).json({ message: "user created", user: newUser });
}

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({ message: "all users", users: users });
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) {
        throw new AppError("User not found", 404);;
    }
    res.status(200).json({ message: "user found", user: user });
}

const updateUser = async (req, res) => {
    try {
    const id = req.params.id;
    const body = req.body;

    const user = await User.findByIdAndUpdate(id, body, { new: true }).orFail();

    if (!user) {
      throw new AppError("Post not found", 404);
    }

    res.status(200).json({ message: "user updated", user: user });
  } catch (error) {
    next(error);
  }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id).orFail();
    if (!deletedUser) {
        throw new AppError("User not found", 404);;
    }   
    await order.deleteMany({user:id})
    res.status(200).json({ message: "user deleted", user: deletedUser });
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}