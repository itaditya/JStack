 // app/routes.js
 // grab the nerd model we just created
 var Blog = require('./models/blog');
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
             Blog.find(function(err, blogs) {
                 if (err) res.send(err);
                 for (var i = blogs.length - 1; i >= 0; i--) {
                    console.log(blogs[i].date);
                    if(blogs[i].date.length != 0){
                        recentBlogs.push(blogs[i]);
                    }
                 }
                 res.json(recentBlogs);
             });
         })
         .post('/api/blogs', function(req, res) {
             var blog = new Blog();
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
         .get('*', function(req, res) {
             res.sendfile('./public/views/index.html'); // load our public/index.html file
         });
 };
