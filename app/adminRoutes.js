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
        var fileName;
        var method = parseInt(req.query.method);
        var tagList = req.body.tags;
        if(method === 0){
            var file = req.files.file;
            if(file){
                fileName = file.name;
                var newPath = "./public/assets/img/coverImg/" + file.name;
                fs.readFile(file.path, function(err, data) {
                    fs.writeFile(newPath, data, function(err) {
                        if (err) {
                            res.json({
                                message: 'image not saved!',
                            });
                        } else {
                            res.json({
                                message: 'image saved!',
                            });
                        }
                    });
                });
            }
        }
        else if(method === 1){
            if(req.body.url){
                var fileUrl = "http://" + req.body.url;
                fileName = req.body.name || fileUrl.substring(fileUrl.lastIndexOf('/')+1);
                var newPath = "./public/assets/img/coverImg/" + fileName;
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
            }
        }else{
            res.json({
                message: 'unknown method',
            });
        }
        async.forEachOf(tagList, function(tagId, index) {
            Tag.findById(tagId, function(err, tag) {
                if (tag) {
                    tag.coverImages.push(fileName);
                    tag.save();
                }
            });
        });
    });
};