// TODO: Require Controllers...
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');
const url = require('url');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/details/:id', (req, res) => {
        res.render('details');
    });

    app.get('/create', (req, res) => {
        res.render('create');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/create/accessory', (req, res) => {
        res.render('createAccessory');
    });

    app.get('/attach/accessory/:id', (req, res) => {
        res.render('attachAccessory');
    });

    app.get('/*', (req, res) => {
        res.render('404');
    });

    app.post('/create', function (req, res) {
        console.log("req.body for creating a cube: ", req.body);
        let newCube = new Cube(req.body);
        newCube.save(function (err, newCube) {
            if (err) return console.error(err);
            console.log("Cube saved!");
        });

        res.redirect(301, "/");
    });

    app.post('/create/accessory', function (req, res) {
        console.log("req.body for creating an accessory: ", req.body);
        let newAccessory = new Accessory(req.body);
        console.log(newAccessory);
        newAccessory.save(function (err, newAccessory) {
            if (err) return console.error(err);
            console.log("Accessory saved!");
        });

        res.redirect(301, "/create/accessory");
    });
};