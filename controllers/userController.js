const User = require('../models/User');

const user_register_post = async (req, res) => {
    if (req.body.password !== req.body.repeatPassword) {
        return res.json({"Status":"Passwords do not match"});
    } else {
        let newUser = await new User(req.body);
        newUser.save(function (err, newUser) {
            if (err) {
                console.log(err);
                res.redirect(301, "/register");
            } else {
                console.log("Registration complete");
                res.redirect(301, "/");
            }
        });
    }
};

const user_login_post = async (req, res) => {
    await User.findOne({"username": req.body.username}, (err, user) => {
        if (!user) return res.json({"Status": "User not found"});

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({"Status": "Password is incorrect"});
            
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('ths_auth', user.token).redirect(301, "/");
            });
        });
    });

};

module.exports = {
    user_register_post,
    user_login_post,
};