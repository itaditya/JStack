var Blog = require('./models/blog');
var User = require('./models/user');
var Tag = require('./models/tag');
var async = require("async");
var nodemailer = require('nodemailer');
var auth = require('./../config/auth');
var showdown = require('showdown');
var converter = new showdown.Converter();
var ensureAuthorized = auth.ensureAuthorized;
var tokenCheck = auth.tokenCheck;
// var colors = require('colors/safe');
module.exports = function (app) {
    app.get('/api/blogs', function (req, res) {
        var limit = parseInt(req.query.limit);
        var sort = req.query.sort || "-views";
        var design = req.query.design;
        var select = "";
        if (limit < 0) {
            limit = 0;
        }
        if (design === "short") {
            select = "coverImg title likes views description authorName";
        } else if (design === "links") {
            select = "title";
        } else {
            select = "";
        }
        var blogQuery = function (req, res, limitParam, sortParam, selectParam, callback) {
            var sortList = ["-views", "-likes", "date", "-date"];
            if (sortList.indexOf(sortParam) != -1) {
                Blog.find().limit(limitParam).select(selectParam).sort(sortParam).exec(function (err, blogs) {
                    if (err) res.send(err);
                    callback(req, res, err, blogs);
                });
            } else {
                res.json({
                    message: 'Undefined Sort Query'
                });
            }
        };
        blogQuery(req, res, limit, sort, select, function (req, res, err, blogs) {
            res.json(blogs);
        });
    }).get('/api/blogs/:id', function (req, res) {
        var blogId = req.params.id;
        if (req.query.type === "short") {
            var select = "coverImg title likes views description authorName";
            Blog.findById(blogId, select, function (err, blog) {
                sendBlog(err, blog);
            });
        } else {
            Blog.findById(blogId, function (err, blog) {
                sendBlog(err, blog)
            });
        }

        function sendBlog(err, blog) {
            if (err) res.send(err);
            if (blog) {
                blog.views += 1;
                blog.save(function (err) {
                    if (err) res.send(err);
                    res.json(blog);
                });
            }
        }
    }).post('/api/blogs', ensureAuthorized, function (req, res) {
        tokenCheck(req.token, res, function (role) {
            var blog = new Blog();
            blog.authorId = req.body.authorId;
            blog.authorName = req.body.authorName;
            blog.date = Date.now();
            blog.title = req.body.title;
            blog.coverImg = req.body.coverImg;
            blog.mdString = req.body.content;
            blog.description = req.body.description;
            blog.content = converter.makeHtml(blog.mdString);
            var tags = req.body.tags;
            blog.tagsData = req.body.tagsData;
            blog.tags = [];
            if (tags) {
                blog.tags = tags;
            } else {
                async.forEachOf(blog.tagsData, function (tag, index) {
                    blog.tags.push(tag.value);
                });
            }
            blog.save(function (err) {
                if (err) res.send(err);
                User.findById(blog.authorId, function (err, user) {
                    user.blogs.push(blog._id);
                    user.save();
                });
                async.forEachOf(blog.tags, function (tagId, index) {
                    if (err) return res.send(err);
                    Tag.findById(tagId, function (err, tag) {
                        if (tag) {
                            tag.blogs.push(blog._id);
                            tag.save();
                        }
                    });
                });
                res.json({
                    message: 'blog created!',
                    id: blog._id
                });
            });
        });
    }).put('/api/blogs/:id', ensureAuthorized, function (req, res) {
        tokenCheck(req.token, res, function (role, id) {
            Blog.findById(req.params.id, function (err, blog) {
                if (typeof blog != "undefined") {
                    var temp = {
                        id: blog.id,
                        title: req.body.title || blog.title,
                        coverImg: req.body.coverImg || blog.coverImg,
                        description: req.body.description || blog.description,
                        mdString: req.body.content || blog.content,
                        content: converter.makeHtml(blog.mdString),
                        tags: req.body.tags || blog.tags,
                        tagsData: req.body.tagsData || blog.tagsData,
                        authorId: req.body.authorId || blog.authorId,
                        authorName: req.body.authorName || blog.authorName,
                        date: req.body.date || blog.date,
                        likes: req.body.likes || blog.likes,
                        comments: req.body.comments || blog.comments,
                        views: req.body.views || blog.views
                    }
                    if (role === "admin") {
                        blog = temp;
                    }
                    if (id === blog.authorId) {
                        //is author
                        blog.title = temp.title;
                        blog.coverImg = temp.coverImg;
                        blog.description = temp.description;
                        blog.mdString = temp.mdString;
                        blog.content = temp.content;
                        blog.tags = temp.tags;
                        blog.tagsData = temp.tagsData;
                    }
                    blog.save(function (err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'blog updated!'
                        });
                    });
                } else {
                    res.json({
                        message: "blog doesn't exist!"
                    });
                }
            });
        })
    }).delete('/api/blogs/:id', ensureAuthorized, function (req, res) {
        tokenCheck(req.token, res, function (role) {
            var blogId = req.params.id;
            Blog.findOne({
                _id: blogId
            }, function (err, blog) {
                if (err) res.send(err);
                if (blog) {
                    User.findOne({
                        _id: blog.authorId
                    }, function (err, user) {
                        if (user) {
                            var index = user.blogs.indexOf(blogId);
                            user.blogs.splice(index, 1);
                            user.save();
                        }
                        Blog.remove({
                            _id: blogId
                        }, function (err) {
                            if (err) res.send(err);
                            res.json({
                                message: 'blog deleted!'
                            });
                        });
                        async.forEachOf(blog.tags, function (tagId, index) {
                            if (err) return res.send(err);
                            Tag.findById(tagId, function (err, tag) {
                                if (tag) {
                                    var index = tag.blogs.indexOf(blogId);
                                    tag.blogs.splice(index, 1);
                                    tag.save();
                                }
                            });
                        });
                    });
                }
            });
        })
    }).post('/api/blogs/userChoice/:id', function (req, res) {
        var blogId = req.params.id;
        Blog.findOne({
            _id: blogId
        }, function (err, blog) {
            blog.likes += parseInt(req.body.value);
            blog.save(function (err) {
                if (err) res.send(err);
                res.json({
                    message: 'blog liked!'
                });
            });
        });
    }).post('/api/subscribe', function (req, res) {
        var emailId = req.body.emailId;
        var transporter = nodemailer.createTransport({
            service: 'Mailgun',
            auth: {
                domain: auth.mailer.auth.domain,
                api_key: auth.mailer.auth.api_key
                // pass: auth.mailer.auth.pass,
            }
        });
        console.log(auth.mailer.auth);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Jstack Team" <adityaa803@gmail.com>', // sender address
            // to: 'git2adi@gmail.com, adityaa803@gmail.com', // list of receivers
            to: emailId, // list of receivers
            subject: 'Subscription Confirmation', // Subject line
            text: 'We are happy that you subscribed us!', // plaintext body
            html: '<b>We are happy that you subscribed us!</b>' // html body
        };
        res.json({
            message: 'blog liked!'
        });
        // send mail with defined transport object
        // transporter.sendMail(mailOptions, function(error, info) {
        //     if (error) {
        //         return console.log(error);
        //     }
        //     console.log('Message sent: ' + info.response);
        //     res.json({
        //         message: 'User Subscribed!'
        //     });
        // });
    }).get('*', function (req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    })
};
