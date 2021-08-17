const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();
require('./config/express')(app);
require('./config/routes')(app);

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db.open is working");
});

app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));