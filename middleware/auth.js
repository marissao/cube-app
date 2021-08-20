const User = require('../models/User');

const auth = async (req, res, next) => {
    // Check if token is valid
    let token = req.cookies.jwt;
    await User.findByToken(token, (err, user) => {
        if (err) console.log("Token not found");
        if (!user) return res.json({
            isAuth: false, 
            error: true,
        });
        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = {auth};