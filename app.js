// app.js
// modules =================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var console = require('better-console');
// configuration ===========================================
// config files
var db = require('./config/db');
// set our port
var port = process.env.PORT || 8080;
mongoose.connect(db.url);
// get all data/stuff of the body (POST) parameters
// parse application/json 
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));
// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});
// routes ==================================================
require('./app/userRoutes')(app);
require('./app/searchRoutes')(app);
require('./app/adminRoutes')(app);
//Place blogRoutes in last as it has get(*) route 
require('./app/blogRoutes')(app);
// start app ===============================================
// startup app at http://localhost:8080
app.listen(port);
// shoutout to the user                     
console.log('Magic happens on port ' + port);
// expose app           
exports = module.exports = app;
process.on('uncaughtException', function(err) {
    console.log(err);
});