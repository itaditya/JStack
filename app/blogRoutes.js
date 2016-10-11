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
         res.json(blog);
       });
     })
     .post('/api/blogs', function(req, res) {
       var blog = new Blog();
       blog.authorId = req.body.authorId;
       blog.date = req.body.date;
       blog.title = req.body.title;
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
           blog.authorId = req.body.authorId;
           blog.date = req.body.date;
           blog.title = req.body.title;
           blog.content = req.body.content;
           blog.tags = req.body.tags;
           blog.likes = req.body.likes;
           blog.comments = req.body.comments;
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
