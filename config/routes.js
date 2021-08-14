const Cube = require('../models/Cube');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const userController = require('../controllers/userController');

module.exports = (app) => {
    app.get('/', async function (req, res) {
        await Cube.find(function (err, cubes){
            if (err) return console.log(err);
             res.render('index', {cubes});
        });        
    });

    app.get('/details/:id', detailsController.details_id_get);

    app.get('/create/cube', createController.create_cube_get);

    app.get('/about', (req, res) => {
        res.render('about');
    });

    app.get('/create/accessory', createController.create_accessory_get);

    app.get('/details/attach/accessory/:id', detailsController.details_attach_accessory_get);

    app.get('/login', userController.user_login_get);

    app.get('/register', userController.user_register_get);

    app.get('/*', (req, res) => {
        res.render('404');
    });
    
    app.post('/create/cube', createController.create_cube_post);

    app.post('/create/accessory', createController.create_accessory_post);

    app.post('/details/attach/accessory/:id', detailsController.details_attach_accessory_post);

    app.post('/register', userController.user_register_post);
};