// app/routes.js
// grab the nerd model we just created
var User = require('./models/user');
module.exports = function(app) {
    app.get('/api/users', function(req, res) {
            User.find(function(err, users) {
                if (err) res.send(err);
                res.json(users);
            });
        })
        .get('/api/users/:id', function(req, res) {
            var userId = req.params.id;
            User.find({ _id: userId }, function(err, user) {
                if (err) res.send(err);
                res.json(user[0]);
            });
        })
        .post('/api/register', function(req, res) {
            User.find({ email: req.body.email }, function(err, user) {
                if (user.length == 0) {
                    var user = new User();
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.password = req.body.password;
                    user.description = req.body.description;
                    user.save(function(err) {
                        if (err) res.send(err);
                        res.json({ message: 'user registered!' });
                    });
                } else {
                    res.json({ message: 'Email already exist!' });
                }
            });
        })
        .post('/api/login', function(req, res) {
            User.find({ email: req.body.email }, function(err, user) {
                if (err) res.send(err);
                if (req.body.password === user[0].password) {
                    res.json({ status: '1' });
                } else {
                    res.json({ status: '0' });
                }
            });
        })
        .put('/api/users/:id', function(req, res) {
            User.findById(req.params.id, function(err, user) {
                if (typeof user != "undefined") {
                    user.name = req.body.name;
                    user.description = req.body.description;
                    user.blogs = req.body.blogs;
                    user.save(function(err) {
                        if (err) res.send(err);
                        res.json({ message: 'user updated!' });
                    });
                } else {
                    res.json({ message: "user doesn't exist!" });
                }
            });
        })
        .delete('/api/users/:id', function(req, res) {
            var userId = req.params.id;
            user.remove({ _id: userId }, function(err) {
                if (err) res.send(err);
                res.json({ message: 'user deleted!' });
            });
        });
};
