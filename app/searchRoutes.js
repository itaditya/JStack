// app/routes.js
// grab the nerd model we just created
var Tag = require('./models/tag');
var async = require("async");
var console = require('better-console');
var tagQuery = function(req, res, limitParam, callback) {
    Tag.find().limit(limitParam).exec(function(err, tags) {
        if (err) res.send(err);
        callback(req, res, err, tags)
    });
};
module.exports = function(app) {
    app.get('/api/tags', function(req, res) {
        var limit = req.query.limit;
        var design = req.query.design;
        if (limit < 0) {
            limit = 0;
        }
        var categories = {
            frontend: 0,
            backend: 1,
            design: 2,
            technical: 3
        };
        tagQuery(req, res, limit, function(req, res, err, tags) {
            if (err) res.send(err);
            if (design === "category") {
                var tagList = [{
                    category: "frontend",
                    tags: []
                }, {
                    category: "backend",
                    tags: []
                }, {
                    category: "design",
                    tags: []
                }, {
                    category: "technical",
                    tags: []
                }];
                var end = tags.length - 1;
                var j = 0;
                async.forEachOf(tags, function(tag, index, callback) {
                    if (err) return callback(err);
                    var categoryIndex = categories[tag.category];
                    if (parseInt(categoryIndex) >= 0) {
                        tagList[categoryIndex].tags.push({
                            id: tag._id,
                            name: tag.name
                        });
                        // console.log(j,"a",tagList[categoryIndex]);
                        if (j++ == end) {
                            return callback(tagList);
                        }
                    }
                }, function(tagList) {
                    var category = req.query.category;
                    if (category) {
                        var categoryIndex = categories[category];
                        res.json(tagList[categoryIndex].tags);
                    } else {
                        // console.table(tagList);
                        return res.json(tagList);
                    }
                });
            } else if (design === "tags") {
                var tagList = [{
                    label: "Frontend",
                    id: 0,
                    choices: []
                }, {
                    label: "Backend",
                    id: 1,
                    choices: []
                }, {
                    label: "Design",
                    id: 2,
                    choices: []
                }, {
                    label: "Technical",
                    id: 3,
                    choices: []
                }];
                var end = tags.length - 1;
                var j = 0;
                async.forEachOf(tags, function(tag, index, callback) {
                    if (err) return callback(err);
                    var categoryIndex = categories[tag.category];
                    if (parseInt(categoryIndex) >= 0) {
                        tagList[categoryIndex].choices.push({
                            label: tag.name,
                            value: tag._id
                        });
                        if (j++ == end) {
                            return callback(tagList);
                        }
                    }
                }, function(tagList) {
                    // console.table(tagList);
                    return res.json(tagList);
                });
            } else {
                res.json(tags);
            }
        });
    }).get('/api/tags/:id', function(req, res) {
        var tagId = req.params.id;
        Tag.findOne({
            _id: tagId
        }, function(err, tag) {
            if (err) res.send(err);
            res.json(tag);
        });
    }).post('/api/tags', function(req, res) {
        var tag = new Tag();
        tag.name = req.body.name;
        tag.category = req.body.category;
        // tag.blogs.push(req.body.blogId);
        tag.save(function(err) {
            if (err) res.send(err);
            res.json({
                message: 'tag created!',
                id: tag._id
            });
        });
    }).put('/api/tags/:id', function(req, res) {
        Tag.findById(req.params.id, function(err, tag) {
            if (typeof tag != "undefined") {
                var blogId = req.body.blogId;
                if (blogId && tag.blogs.indexOf(blogId) === -1) {
                    tag.blogs.push(blogId);
                }
                tag.name = req.body.name || tag.name;
                tag.category = req.body.category || tag.category;
                tag.save(function(err) {
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
    }).delete('/api/tags/:id', function(req, res) {
        var tagId = req.params.id;
        Tag.findOne({
            _id: tagId
        }, function(err, tag) {
            if (err) res.send(err);
            if (tag) {
                User.findOne({
                    _id: tag.authorId
                }, function(err, user) {
                    if (user) {
                        var index = user.tags.indexOf(tagId);
                        user.tags.splice(index, 1);
                        user.save();
                    }
                });
                Tag.remove({
                    _id: tagId
                }, function(err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'tag deleted!'
                    });
                });
            }
        });
    });
};