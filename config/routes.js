// TODO: Require Controllers...
const Cube = require('../models/Cube');
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.get('/details', (req, res) => {
        res.render('details');
    });

    app.get('/create', (req, res) => {
        res.render('create');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/create/accessory', (req, res) => {
        res.render('about');
    });

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/*', (req, res) => {
        res.render('404');
    });

    app.post('/create', function (req, res) {
        console.log("This is req.body: ", req.body);
        let newCube = new Cube(req.body);
        newCube.save(function (err, newCube) {
            if (err) return console.error(err);
            console.log("Entry saved!");
        });

        res.send('Form submission received');
    });
};