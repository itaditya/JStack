 // app/routes.js
 // grab the nerd model we just created
 var Blog = require('./models/blog');
var nodemailer = require('nodemailer');
var mailSender = require('./../config/auth');


 module.exports = function(app) {
     app.get('/api/blogs', function(req, res) {
             Blog.find(function(err, blogs) {
                 if (err) res.send(err);
                 res.json(blogs);
             });
         })
         .get('/api/blogs/:id', function(req, res) {
             var blogId = req.params.id;
             Blog.find({ _id: blogId }, function(err, blog) {
                 if (err) res.send(err);
                 res.json(blog[0]);
             });
         })
         .get('/api/recentBlogs', function(req, res) {
             var recentBlogs = [];
             // console.log(Blog.find().sort({ "date": -1 }).limit(1));
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
         })
         .post('/api/blogs', function(req, res) {
             var blog = new Blog();
             blog.authorId = req.body.authorId;
             blog.date = Date.now();
             blog.title = req.body.title;
             blog.coverImg = req.body.coverImg;
             blog.content = req.body.content;
             blog.tags = req.body.tags;
             blog.likes = req.body.likes;
             blog.comments = req.body.comments;
             blog.save(function(err) {
                 if (err) res.send(err);
                 res.json({ message: 'blog created!' });
             });
         })
         .put('/api/blogs/:id', function(req, res) {
             Blog.findById(req.params.id, function(err, blog) {
                 if (typeof blog != "undefined") {
                     blog.authorId = req.body.authorId || blog.authorId;
                     blog.date = req.body.date || blog.date;
                     blog.title = req.body.title || blog.title;
                     blog.coverImg = req.body.coverImg || blog.coverImg;
                     blog.content = req.body.content || blog.content;
                     blog.tags = req.body.tags || blog.tags;
                     blog.likes = req.body.likes || blog.likes;
                     blog.comments = req.body.comments || blog.comments;
                     blog.save(function(err) {
                         if (err) res.send(err);
                         res.json({ message: 'blog updated!' });
                     });
                 } else {
                     res.json({ message: "blog doesn't exist!" });
                 }
             });
         })
         .delete('/api/blogs/:id', function(req, res) {
             var blogId = req.params.id;
             Blog.remove({ _id: blogId }, function(err) {
                 if (err) res.send(err);
                 res.json({ message: 'blog deleted!' });
             });
         })
         .post('/api/subscribe', function(req, res) {
            var emailId = req.body.emailId;
            var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user:mailSender.mailer.auth.user,
                        pass:mailSender.mailer.auth.pass,
                    }
                });

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
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });
         })
         .get('*', function(req, res) {
             res.sendfile('./public/views/index.html'); // load our public/index.html file
         });
 };
