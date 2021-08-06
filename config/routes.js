// TODO: Require Controllers...

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

    app.get('/*', (req, res) => {
        res.render('404');
    });
};