require('dotenv').config()

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const mangoose = require('mongoose');
const user = require('./models/user');
app.use(express.json());
const AppError = require('./utils/appError');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require("bcryptjs");
app.use(express.static(path.join(__dirname,'uploads')));
const limiter = require('./utils/rate_limit');
app.use(limiter);

app.use(cors());
app.use(morgan('dev'));

const userRouter = require('./router/user');
const mealRouter = require('./router/meal');
const orderRouter = require('./router/order');
const authRouter = require('./router/auth');
app.use("/users", userRouter);
app.use("/meals", mealRouter);
app.use("/orders", orderRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({status:"error", message: err.message });
  }
  if(err.code===11000){
      const field = Object.keys(err.keyPattern)[0]
      res.status(400).json({status:"error",message:`Duplicate value ${field}`})
    }
    if(err.name === "CastError"){
      res.status(400).json({status:"error",message:`invalid id fromat`})
    }
    if(err.name === "ValidationError"){
      res.status(400).json({status:"error",message:err.message})
    }
    if(err.name === "JsonWebTokenError"){
      return res.status(401).json({status:"error",message:"Invalid token"})
    }
    if(err.name === "TokenExpiredError"){
      return res.status(401).json({status:"error",message:"Token expired"})
    }
  res.status(500).json({ status:"error",message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    mangoose.connect(process.env.DB)
    .then(async() => {
   const adminEmail = process.env.ADMINEMAIL;
    const existAdmin = await user.findOne({ email: adminEmail });
    if (!existAdmin) {
      await user.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMINEMAIL,
        password: await bcrypt.hash(process.env.ADMINPASSWORD, 10),
        role: process.env.ADMINROLE,
      });
    }
    console.log('Database connected successfully');
    }).catch((err) => {
        console.error('Database connection error:', err);
    });

});



