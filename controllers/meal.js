const AppError = require('../utils/appError');
const Meal = require('../models/meal');
const Order = require('../models/order');

const getAllMeals = async (req, res) => {
    const meals = await Meal.find();
    res.status(200).json({ message: "all meals", meals: meals });
}

const getMealByid = async (req, res) => {
    const id = req.params.id;
    const meal = await Meal.findById(id);
    if (!meal) {
        throw new AppError("Meal not found", 404);
    }
    res.status(200).json({ message: "meal found", meal: meal });
}

const addMeal = async (req, res) => {
    const body = req.body;
    const imageUrls=Array.isArray(req.images)&& req.images.length>0?req.images[0]:null
    console.log (imageUrls)
    const newMeal =await new Meal({
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        image: imageUrls
    });
    await newMeal.save();
   res.status(200).json({ message: "meal added", meal: newMeal });
}

const updateMeal = async (req, res,next) => {
    try {
    const id = req.params.id;
    const body = req.body;
    const meal = await Meal.findByIdAndUpdate(id, body, { new: true }).orFail();

    if (!meal) {
      throw new AppError("Meal not found", 404);
    }
    res.status(200).json({ message: "meal updated", meal: meal });
  } catch (error) {
    next(error);
  }
}

const deleteMeal = async (req, res) => {
    const id = req.params.id;
    const deletedMeal = await Meal.findByIdAndDelete(id).orFail();
    if (!deletedMeal) {
        throw new AppError("Meal not found", 404);
    }   
    await Order.deleteMany({meal:id})
    res.status(200).json({ message: "meal deleted", meal: deletedMeal });
}


module.exports = {
    getAllMeals,
    getMealByid,
    addMeal,
    updateMeal,
    deleteMeal
}