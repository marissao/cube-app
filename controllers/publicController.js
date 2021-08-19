const Cube = require('../models/Cube');
const session = require('express-session');

const index_get = async function (req, res) {
    let cubes = await Cube.find(function (err, cubes){
        if (err) return console.log(err);
    });
    res.render('index', {cubes}); // cubes is an array, need to pass in as obj for hbs
};

const about_get = (req, res) => {
    res.render('about');
};

const login_get = (req, res) => {
    res.render('loginPage');
};

const register_get = (req, res) => {
    res.render('registerPage');
};

module.exports = {
    index_get,
    about_get,
    login_get,
    register_get,
};