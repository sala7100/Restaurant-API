const AppError = require("../utils/appError");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const util=require("util");
const { access } = require('fs');
const sign = util.promisify(jwt.sign);

const signup = async (req, res) => {
    const body = req.body;
    const saltRounds = Number(process.env.SALTROUNDS) ;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const newUser = await User.create({ 
        ...body,
        password: hashedPassword });
    res.status(201).json({ status: "success", data: newUser });
}

const login = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }
    const jwtsecret = process.env.JWTSECRET;
    const expirtime = "1d";
    const token = await sign({ id: user._id }, jwtsecret, { expiresIn: expirtime });
    res.status(200).json({ message: "login successful", access_token: token ,user });
}

module.exports = {
    signup,
    login
};