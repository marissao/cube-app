const User = require('../models/User');

const user_login_get = (req, res) => {
    res.render('loginPage');
};

const user_register_get = (req, res) => {
    res.render('registerPage');
};

const user_register_post = (req, res) => {
    let newUser = new User(req.body);
    newUser.save(function (err, newUser) {
        if (err) return console.log(err);
        console.log("Registration complete");
    });

    res.redirect(301, "/");
};

module.exports = {
    user_login_get,
    user_register_get,
    user_register_post,
};