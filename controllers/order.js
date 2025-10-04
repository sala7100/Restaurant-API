const AppError = require("../utils/appError");
const Order = require("../models/order");
const Meal = require("../models/meal");

const createOrder = async (req, res) => {
  const body = req.body;
  const meal = await Meal.findById(body.meal).orFail();
  if (!meal) {
    throw new AppError("Meal not found", 404);
  }
  const totalPrice = meal.price * body.quantity;
  const newOrder = new Order({
    quantity: body.quantity,
    totalPrice,
    status: "pending",
    user: body.user,
    meal: body.meal
    });
  await newOrder.save();
  res.status(200).json({ message: "order created", order: newOrder });
}

const cancelOrder = async (req, res, next) => {
    const id = req.params.id;   
    const order = await Order.findByIdAndDelete(id).orFail();
    if (!order) {
        throw new AppError("Order not found", 404);
    }   
    res.status(200).json({ message: "order canceled", order: order });
}

module.exports = {
    createOrder,
    cancelOrder
};