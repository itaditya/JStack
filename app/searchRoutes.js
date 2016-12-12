// app/routes.js
// grab the nerd model we just created
var Tag = require('./models/tag');
var Category = require('./models/category');
module.exports = function(app) {
    app.get('/api/tags', function(req, res) {
        var tagList = [];
        n = req.query.len;
        console.log(req.query);
        if (n === undefined) {
            Tag.find(function(err, tags) {
                if (err) res.send(err);
                res.json(tags);
            });
        } else {
            Tag.find(function(err, tags) {
                var l = tags.length;
                j = 0;
                //j is used to handle async User.findOne request
                if (n > l) {
                    n = l;
                }
                for (i = 0; i < n; i++) {
                    var authorName;
                    User.findOne({
                        _id: tags[i].authorId
                    }, function(err, user) {
                        authorName = user.name;
                        tagList.push({
                            _id: tags[j]._id,
                            coverImg: tags[j].coverImg,
                            date: tags[j].date,
                            title: tags[j].title,
                            authorName: authorName
                        });
                        if (++j == n) {
                            j = 0;
                            res.json(tagList);
                        }
                    });
                }
            });
        }
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
        tag.blogs.push(req.body.blogId);
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
                tag.blogs = req.body.blogs || tag.blogs;
                tag.name = req.body.name || tag.name;
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