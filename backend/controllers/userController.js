// const User = require('../models/userModel');

module.exports.addUser = async (req, res) => {
    console.log(req.body);
    res.status(200);
    // const user = new User({})
}

module.exports.getUser = (req, res) => {
    console.log(req.body);
}

module.exports.getAllUsers = (req, res) => {
    console.log(req.body)
}