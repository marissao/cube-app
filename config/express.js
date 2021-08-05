const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // Register a Handlebars View Engine Using the Node Package
    app.engine('handlebars', exphbs({
        extname: 'handlebars',
        defaultLayout: null,
    }));

    app.set('view engine', 'handlebars'); // Looks for files that end with "handlebars"
    
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

    app.get('/404', (req, res) => {
        res.render('404');
    });

    //TODO: Setup the body parser

    //TODO: Setup the static files

};