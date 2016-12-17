// app/routes.js
// grab the nerd model we just created
var Blog = require('./models/blog');
var User = require('./models/user');
var Tag = require('./models/tag');
var async = require("async");
var nodemailer = require('nodemailer');
var mailSender = require('./../config/auth');
var showdown = require('showdown');
var converter = new showdown.Converter();
var colors = require('colors/safe');
module.exports = function(app) {
    app.get('/api/blogs', function(req, res) {
        var blogList = [];
        n = req.query.len;
        console.log(req.query);
        Blog.find(function(err, blogs) {
            if (n === undefined) {
                if (err) res.send(err);
                res.json(blogs);
            } else {
                var l = blogs.length;
                var j = 0;
                if (n > l) {
                    n = l;
                }
                console.log(n);
                async.forEachOfLimit(blogs, n, function(blog, i, callback) {
                    if (err) return callback(err);
                    User.findById(blog.authorId, function(err, user) {
                        // console.log("omit",omit(blog, ['authorId','mdString','content','tags']),"--------------");
                        blogList.push({
                            _id: blog._id,
                            coverImg: blog.coverImg,
                            title: blog.title,
                            likes: blog.likes,
                            views: blog.views,
                            description: blog.description,
                            authorName: user.name
                        });
                        if (++j == n) {
                            return callback(blogList);
                        }
                    });
                }, function(blogList) {
                    return res.json(blogList);
                });
            }
        });
    }).get('/api/blogs/:id', function(req, res) {
        console.log(req.query);
        var blogId = req.params.id;
        Blog.findById(blogId, function(err, blog) {
            if (err) res.send(err);
            if (blog) {
                blog.views += 1;
                blog.save(function(err) {
                    if (err) res.send(err);
                    if (req.query.type === "short") {
                        res.json({
                            _id: blog._id,
                            coverImg: blog.coverImg,
                            title: blog.title,
                            likes: blog.likes,
                            views: blog.views,
                            description: blog.description,
                        });
                    } else {
                        res.json(blog);
                    }
                });
            }
        });
    }).get('/api/recentBlogs', function(req, res) {
        var recentBlogs = [];
        Blog.find(function(err, blogs) {
            var l = blogs.length;
            for (var i = 1; i <= 3; i++) {
                var a = l - i;
                if (a >= 0) {
                    var stripBlog = {
                        _id: blogs[a]._id,
                        coverImg: blogs[a].coverImg,
                        date: blogs[a].date,
                        title: blogs[a].title
                    }
                    recentBlogs.push(stripBlog);
                }
            }
            res.json(recentBlogs);
        });
    }).post('/api/blogs', function(req, res) {
        var blog = new Blog();
        blog.authorId = req.body.authorId;
        blog.date = Date.now();
        blog.title = req.body.title;
        blog.coverImg = req.body.coverImg;
        blog.mdString = req.body.content;
        blog.description = req.body.description;
        blog.content = converter.makeHtml(blog.mdString);
        blog.tags = req.body.tags;
        blog.save(function(err) {
            if (err) res.send(err);
            User.findById(blog.authorId, function(err, user) {
                user.blogs.push(blog._id);
                user.save();
            });
            async.forEachOf(blog.tags, function(tagId, index) {
                if (err) return res.send(err);
                Tag.findById(tagId, function(err, tag) {
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
    }).put('/api/blogs/:id', function(req, res) {
        Blog.findById(req.params.id, function(err, blog) {
            if (typeof blog != "undefined") {
                blog.authorId = req.body.authorId || blog.authorId;
                blog.date = req.body.date || blog.date;
                blog.title = req.body.title || blog.title;
                blog.coverImg = req.body.coverImg || blog.coverImg;
                blog.description = req.body.description || blog.description;
                blog.mdString = req.body.content || blog.content;
                blog.content = converter.makeHtml(blog.mdString);
                blog.tags = req.body.tags || blog.tags;
                blog.likes = req.body.likes || blog.likes;
                blog.comments = req.body.comments || blog.comments;
                blog.save(function(err) {
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
    }).delete('/api/blogs/:id', function(req, res) {
        var blogId = req.params.id;
        Blog.findOne({
            _id: blogId
        }, function(err, blog) {
            if (err) res.send(err);
            if (blog) {
                User.findOne({
                    _id: blog.authorId
                }, function(err, user) {
                    if (user) {
                        var index = user.blogs.indexOf(blogId);
                        user.blogs.splice(index, 1);
                        user.save();
                    }
                    Blog.remove({
                        _id: blogId
                    }, function(err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'blog deleted!'
                        });
                    });
                    async.forEachOf(blog.tags, function(tagId, index) {
                        if (err) return res.send(err);
                        Tag.findById(tagId, function(err, tag) {
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
    }).post('/api/blogs/userChoice/:id', function(req, res) {
        var blogId = req.params.id;
        Blog.findOne({
            _id: blogId
        }, function(err, blog) {
            blog.likes += parseInt(req.body.value);
            blog.save(function(err) {
                if (err) res.send(err);
                res.json({
                    message: 'blog liked!'
                });
            });
        });
    }).post('/api/subscribe', function(req, res) {
        var emailId = req.body.emailId;
        var transporter = nodemailer.createTransport({
            service: 'Mailgun',
            auth: {
                domain: mailSender.mailer.auth.domain,
                api_key: mailSender.mailer.auth.api_key
                    // pass: mailSender.mailer.auth.pass,
            }
        });
        console.log(mailSender.mailer.auth);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"Jstack Team" <adityaa803@gmail.com>', // sender address
            // to: 'git2adi@gmail.com, adityaa803@gmail.com', // list of receivers
            to: emailId, // list of receivers
            subject: 'Subscription Confirmation', // Subject line
            text: 'We are happy that you subscribed us!', // plaintext body
            html: '<b>We are happy that you subscribed us!</b>' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
            res.json({
                message: 'User Subscribed!'
            });
        });
    }).get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); // load our public/index.html file
    });
};