// app/routes.js
// grab the nerd model we just created
var Blog = require('./models/blog');
var User = require('./models/user');
var Tag = require('./models/tag');
var async = require("async");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var http = require('http');
var fs = require('fs');
module.exports = function(app) {
    app.post('/api/images', multipartMiddleware, function(req, res) {
        console.log(req.query);
        var file = req.files.file;
        console.log(file);
        var newPath = "./public/assets/img/coverImg/" + file.name;
        fs.readFile(file.path, function(err, data) {
            fs.writeFile(newPath, data, function(err) { // write file in uploads folder
                if (err) {
                    res.json("Failed to upload your file");
                } else {
                    res.json("Successfully uploaded your file");
                }
            });
        });
    }).post('/api/imgUrl', multipartMiddleware, function(req, res) {
        var fileUrl = "http://" + req.body.url;
        // var fileName = req.body.name || fileUrl.substring(fileUrl.lastIndexOf('/')+1);
        var fileName = fileUrl.substring(fileUrl.lastIndexOf('/')+1);
        var newPath = "./public/assets/img/coverImg/" + fileName;
        console.log(fileName);
        var f = fs.createWriteStream(newPath);
        var request = http.get(fileUrl, function(response) {
            response.pipe(f);
            f.on('finish', function() {
                f.close(); // close() is async, call cb after close completes.
            });
        });
        res.json({
            message: 'image saved!',
        });
        // don't forget to delete all req.files when done 
    });
};
// , {encoding: 'binary'}