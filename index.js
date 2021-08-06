const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://marissa:pass1234word@cluster0.mis4g.mongodb.net/cube-database?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
// const Cube = require('./models/Cube');

require('./config/express')(app);
require('./config/routes')(app);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db.open is working");
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));