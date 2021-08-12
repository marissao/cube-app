// TODO: Require Controllers...
const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

module.exports = (app) => {
    app.get('/', async function (req, res) {
        await Cube.find(function (err, cubes){
            if (err) return console.log(err);
             res.render('index', {cubes});
        });        
    });

    app.get('/details/:id', async function (req, res) {
        let cubeId = req.params.id;
        // cubeId = req.url.split("/")[2]; // Alt way to get ID
        // await Cube.findById(cubeId, function (err, cubes) {
        //     if (err) return console.log(err);
        //     res.render('details', cubes);
        // });
        const cube = await Cube.findById(cubeId).populate('accessories');
        console.log("After populate: ", cube);
        res.render('details', cube);
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

    app.get('/details/attach/accessory/:id', (req, res) => {
        let cubeId = req.params.id;
        Cube.findById(cubeId, async function (err, cube) {
            if (err) return console.log(err);
            
            let addAccesoriesObj = {
                cube: {
                    accessories: cube.accessories,
                    _id: cube._id,
                    name: cube.name,
                    imageUrl: cube.imageUrl,
                }
            };
            
            if (addAccesoriesObj.cube.accessories.length === 0) {
                let accessoriesArrSimple = [];
                await Accessory.find({}, function (err, accessories){
                    accessories.forEach(accessory => {
                        accessoriesArrSimple.push({ _id: accessory.id, name: accessory.name});
                    });
                    
                });
                addAccesoriesObj.options = accessoriesArrSimple;
            }
            // console.log("1: ", addAccesoriesObj);
            res.render("attachAccessory", addAccesoriesObj);
        }); 
    });

    app.get('/*', (req, res) => {
        res.render('404');
    });
    
    app.post('/create', function (req, res) {
        // console.log("req.body for creating a cube: ", req.body);
        let newCube = new Cube(req.body);
        newCube.save(function (err, newCube) {
            if (err) return console.error(err);
            console.log("Cube saved!");
        });

        res.redirect(301, "/");
    });

    app.post('/create/accessory', function (req, res) {
        // console.log("req.body for creating an accessory: ", req.body);
        let newAccessory = new Accessory(req.body);
        console.log(newAccessory);
        newAccessory.save(function (err, newAccessory) {
            if (err) return console.error(err);
            console.log("Accessory saved!");
        });

        res.redirect(301, "/create/accessory");
    });

    app.post('/details/attach/accessory/:id', async function (req, res) {
        const accessoryId = req.body.accessory.split(" ")[1];
        const cubeId = req.params.id;
        console.log("3: ", accessoryId);
        console.log("4: ", cubeId);
        // Grab cube by ID
        const cube = await Cube.findById(cubeId);
        // Assign accessory's ID to found cube
        cube.accessories.push(accessoryId);
        await cube.save();

        // Grab accessory by ID
        const accessory = await Accessory.findById(accessoryId);
        accessory.cubes.push(cubeId);
        await accessory.save();
        res.status(201);
        console.log("It works!");

        res.redirect(301, `/details/${cubeId}`);
    });
};