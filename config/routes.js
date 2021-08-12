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
        const cube = await Cube.findById(cubeId).populate('accessories');
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

    app.get('/details/attach/accessory/:id', async function (req, res) {
        const cubeId = req.params.id;
        const cube = await Cube.findById(cubeId, (err, cube) => {
            if (err) return console.log(err); 
        });
            
        let outputObj = {
            cube: {
                accessories: cube.accessories,
                _id: cube._id,
                name: cube.name,
                imageUrl: cube.imageUrl,
            },
        };
            
        let outputArr = [];
        if (outputObj.cube.accessories.length === 0) {
            // Grab all accessories from accessories database
            await Accessory.find({}, function (err, accessories){
                accessories.forEach(accessory => {
                    outputArr.push({ _id: accessory.id, name: accessory.name});
                });    
            });

            // Create new property to outputObj so hbs can render data from two collections
            outputObj.options = outputArr;

        } else {
            // Grab all docs in accessories collection that are not equal to the values in cube.accessories array
            const availableAccessories = await Accessory.find({ _id: { $nin: cube.accessories } });
            outputObj.options = availableAccessories;
        }

        res.render("attachAccessory", outputObj);
    });

    app.get('/*', (req, res) => {
        res.render('404');
    });
    
    app.post('/create', function (req, res) {
        let newCube = new Cube(req.body);
        newCube.save(function (err, newCube) {
            if (err) return console.error(err);
            console.log("Cube saved!");
        });

        res.redirect(301, "/");
    });

    app.post('/create/accessory', function (req, res) {
        let newAccessory = new Accessory(req.body);
        newAccessory.save(function (err, newAccessory) {
            if (err) return console.error(err);
            console.log("Accessory saved!");
        });

        res.redirect(301, "/create/accessory");
    });

    app.post('/details/attach/accessory/:id', async function (req, res) {
        const accessoryId = req.body.accessory.split(" ")[1];
        const cubeId = req.params.id;

        // Grab cube by ID
        const cube = await Cube.findById(cubeId);

        // Assign accessory's ID to found cube
        cube.accessories.push(accessoryId);
        await cube.save();

        // Grab accessory by ID
        const accessory = await Accessory.findById(accessoryId);
        accessory.cubes.push(cubeId);
        await accessory.save();

        res.redirect(301, `/details/${cubeId}`);
    });
};