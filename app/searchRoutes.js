// app/routes.js
// grab the nerd model we just created
var Tag = require('./models/tag');
var Blog = require('./models/blog');
var async = require("async");
var console = require('better-console');
var tagQuery = function (req, res, limitParam, selectParam, callback) {
    Tag.find().limit(limitParam).select(selectParam).exec(function (err, tags) {
        if (err) res.send(err);
        callback(req, res, err, tags)
    });
};
module.exports = function (app) {
    app.get('/api/tags', function (req, res) {
        var limit = req.query.limit;
        var select = req.query.select || "";
        if (limit < 0) {
            limit = 0;
        }
        tagQuery(req, res, limit,select, function (req, res, err, tags) {
            if (err) res.send(err);
            res.json(tags);
        })
    }).get('/api/tags/:id', function (req, res) {
        var tagId = req.params.id;
        Tag.findOne({
            _id: tagId
        }, function (err, tag) {
            if (err) res.send(err);
            res.json(tag);
        });
    }).post('/api/tags', function (req, res) {
        var tag = new Tag();
        tag.name = req.body.name;
        tag.category = req.body.category;
        // tag.blogs.push(req.body.blogId);
        tag.save(function (err) {
            if (err) res.send(err);
            res.json({
                message: 'tag created!',
                id: tag._id
            });
        });
    }).put('/api/tags/:id', function (req, res) {
        Tag.findById(req.params.id, function (err, tag) {
            if (typeof tag != "undefined") {
                var blogId = req.body.blogId;
                if (blogId) {
                    if (typeof blogId === "string" && tag.blogs.indexOf(blogId) === -1) {
                        //only one blog's id is passed
                        tag.blogs.push(blogId);
                    }
                    if (blogId === "object" && blogId.length != "undefined") {
                        //an array must be passed
                        tag.blogs = blogId;
                    }
                }
                var imgName = req.body.imgName;
                if (imgName) {
                    if (typeof imgName === "string" && tag.coverImages.indexOf(imgName) === -1) {
                        //only one coverImage's name is passed
                        tag.coverImages.push(imgName);
                    }
                    if (imgName === "object" && imgName.length != "undefined") {
                        //an array must be passed
                        tag.coverImages = imgName;
                    }
                }
                tag.name = req.body.name || tag.name;
                tag.category = req.body.category || tag.category;
                tag.save(function (err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'tag updated!'
                    });
                });
            } else {
                res.json({
                    message: "tag doesn't exist!"
                });
            }
        });
    }).delete('/api/tags/:id', function (req, res) {
        var tagId = req.params.id;
        Tag.findOne({
            _id: tagId
        }, function (err, tag) {
            if (err) res.send(err);
            if (tag) {
                async.forEachOf(tag.blogs, function (blogId, index) {
                    if (err) return res.send(err);
                    Blog.findById(blogId, function (err, blog) {
                        if (blog) {
                            var index = blog.tags.indexOf(tagId);
                            blog.tags.splice(index, 1);
                            blog.save();
                        }
                    });
                });
                Tag.remove({
                    _id: tagId
                }, function (err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'tag deleted!'
                    });
                });
            }
        });
    });
};
