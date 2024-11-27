const User = require("../model/user");
const jwt = require("jsonwebtoken");

const loginService = (email) => User.findOne({ email });

const updateToken = (user) => {
    return User.updateOne({ _id: user._id }, { token: user.token });
};

const generateToken = (userId, secret) => jwt.sign(userId, secret);

module.exports = { loginService, updateToken, generateToken };
