const publicController = require('../controllers/publicController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const userController = require('../controllers/userController');
const session = require('express-session');
const {auth} = require('../middleware/auth');

module.exports = (app) => {
    // Express-session: configure session middleware
    // app.use(
    //     session({
    //         key: "user_id",
    //         secret: "somerandomstuff",
    //         resave: false,
    //         saveUninitialized: false,
    //         cookie: {
    //             expires: 600000, // Session lasts 6 days
    //         },
    //     })
    // );
    
    // Middleware deletes cookies in user browser if user is logged out
    // app.use((req, res, next) => {
    //     if (req.session.user && req.cookies.user_id) {
    //         res.redirect("user_id");
    //     }
    //     next();
    // });
    
    // Middleware function which checks whether user is signed in or not. Used to pass into routes.
    // const sessionChecker = (req, res, next) => {
    //     console.log("User is logged in!");
    //     if (req.session.user && req.cookies.user_id) {
    //         console.log("I'm redirecting b/c of middleware");
    //         res.redirect("/");
    //     } else {
    //         next();
    //     }
    // };
    
    app.get('/', auth, publicController.index_get);

    app.get('/details/:id', auth, detailsController.details_id_get);

    app.get('/create/cube', auth, createController.create_cube_get);

    app.get('/about', auth, publicController.about_get);

    app.get('/create/accessory', auth, createController.create_accessory_get);

    app.get('/details/attach/accessory/:id', auth, detailsController.details_attach_accessory_get);

    app.get('/login', auth, publicController.login_get);

    app.get('/register', auth, publicController.register_get);

    app.get('/*', auth, (req, res) => {
        res.render('404');
    });
    
    app.post('/create/cube', createController.create_cube_post);

    app.post('/create/accessory', createController.create_accessory_post);

    app.post('/details/attach/accessory/:id', detailsController.details_attach_accessory_post);

    app.post('/register', userController.user_register_post);

    app.post('/login', userController.user_login_post);
};