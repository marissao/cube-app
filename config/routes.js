// TODO: Require Controllers...
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = (app) => {
    app.get('/', (req, res) => {
        Cube.find(function(err, cubes){
            if (err) return console.log(err);
            res.render('index', {cubes});
        }).lean();        
    });

    app.get('/details/:id', (req, res) => {
        let currentId = req.url.split("/")[2];
        Cube.findById(currentId, function (err, cube) {
            if (err) return console.log(err);
            res.render('details', cube);
        }); 
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