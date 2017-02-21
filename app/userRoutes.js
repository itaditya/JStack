var User = require('./models/user');
var sendMail = require('./sendMail');
var auth = require('./../config/auth');
var jwt = require("jsonwebtoken");
var ensureAuthorized = auth.ensureAuthorized;
var tokenCheck = auth.tokenCheck;
module.exports = function (app) {
    app.get('/api/users', ensureAuthorized, function (req, res) {
        tokenCheck(req.token, res, function (role) {
            if (role === "admin") {
                User.find(function (err, users) {
                    if (err) res.send(err);
                    res.json(users);
                });
            } else {
                res.send({
                    message: "Need Admin Rights",
                    status: 0
                })
            }
        });
    }).get('/api/users/:id', function (req, res) {
        var userId = req.params.id;
        User.findOne({
            _id: userId
        }, function (err, user) {
            if (err) res.send(err);
            if (user) {
                res.json(user);
            } else {
                res.json({
                    message: 'User Not Found!',
                    status: 0
                });
            }
        });
    }).post('/api/register', function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (!user) {
                var user = new User();
                user.password = req.body.password;
                var cpassword = req.body.cpassword;
                if (user.password === cpassword) {
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.description = req.body.description;
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.password = jwt.sign(user.password, process.env.JWT_PASS_SECRET);
                    user.save(function (err) {
                        if (err) res.send(err);
                        res.json({
                            id: user.id,
                            message: 'User Registered!',
                            status: 1
                        });
                    });
                } else {
                    if (err) res.send(err);
                    res.json({
                        message: 'Passwords Do Not Match!',
                        status: 0
                    });
                }
            } else {
                res.json({
                    message: 'You Have Already Registered, Please Sign In!',
                    status: -1
                });
            }
        });
    }).post('/api/users/verifyAccount/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) res.send(err);
            if (user) {
                var config = {
                    type: 3,
                    email: user.email,
                    id: user.id,
                }
                sendMail(config, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    res.json({
                        message: 'Verification Link Sent!',
                        status: 1
                    });
                });
            } else {
                res.json({
                    status: 0
                });
            }
        });
    }).get('/api/users/verifyAccount/:id', function (req, res) {
        console.log(req.query.email, req.params.id);
        User.findOne({
            email: req.query.email,
            _id: req.params.id
        }, function (err, user) {
            if (err) res.send(err);
            if (user) {
                user.verified = true
                user.save(function (err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'Account Verified!',
                        status: 1
                    });
                });
            } else {
                res.json({
                    status: 0
                });
            }
        });
    }).post('/api/login', function (req, res) {
        var selectParam = "role token blogs";
        var password = jwt.sign(req.body.password, process.env.JWT_PASS_SECRET);
        User.findOne({
            email: req.body.email,
            password: password
        }).select(selectParam).lean().exec(function (err, user) {
            if (err) res.send(err);
            if (user) {
                user.status = 1;
                res.json(user);
            } else {
                res.json({
                    status: 0
                });
            }
        });
    }).post('/api/recoverPassword', function (req, res) {
        console.log(req.body.email);
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) res.send(err);
            if (user) {
                user.resetPasswordToken = jwt.sign(user.password, process.env.JWT_SECRET);
                var config = {
                    type: 2,
                    email: user.email,
                    resetPasswordToken: user.resetPasswordToken
                }
                user.save(function (err) {
                    sendMail(config, function (error, info) {
                        if (error) {
                            return console.log(error);
                        }
                        res.json({
                            status: 1
                        });
                    });
                });
            } else {
                res.json({
                    status: 0
                });
            }
        });
    }).put('/api/changePassword', function (req, res) {
        User.findOne({
            email: req.body.email,
            resetPasswordToken: req.body.resetPasswordToken
        }, function (err, user) {
            if (err) res.send(err);
            if (user) {
                var password = req.body.password;
                var cpassword = req.body.cpassword;
                var resetPasswordToken = req.body.resetPasswordToken;
                if ((password === cpassword) && (user.resetPasswordToken.length > 0)) {
                    user.password = password;
                    user.resetPasswordToken = "";
                    user.save(function (err) {
                        if (err) res.send(err);
                        res.json({
                            message: 'Password Changed!',
                            status: 1
                        });
                    });
                } else {
                    if (err) res.send(err);
                    res.json({
                        message: 'Passwords Do Not Match!',
                        status: 0
                    });
                }
            } else {
                res.json({
                    status: 0
                });
            }
        });
    }).put('/api/users/:id', ensureAuthorized, function (req, res) {
        tokenCheck(req.token, res, function (role, id) {
            User.findById(req.params.id, function (err, user) {
                if (typeof user != "undefined") {
                    if (role === "admin") {
                        user.name = req.body.name || user.name;
                        user.description = req.body.description || user.description;
                        user.image = req.body.image || user.image;
                        user.email = req.body.email || user.email;
                        user.password = req.body.password || user.password;
                        user.blogs = req.body.blogs || user.blogs;
                        user.verified = req.body.verified || user.verified;
                        user.token = req.body.token || user.token;
                        user.role = req.body.role || user.role;
                        user.save(function (err) {
                            if (err) res.send(err);
                            res.json({
                                message: 'user updated!'
                            });
                        });
                    } else if (id === user.id) {
                        user.name = req.body.name || user.name;
                        user.description = req.body.description || user.description;
                        user.image = req.body.image || user.image;
                        user.email = req.body.email || user.email;
                        user.save(function (err) {
                            if (err) res.send(err);
                            res.json({
                                message: 'user updated!'
                            });
                        });
                    } else {
                        res.send({
                            message: "No Access Rights",
                            status: 0
                        })
                    }
                } else {
                    res.json({
                        message: "User doesn't exist!"
                    });
                }
            });
        })
    }).delete('/api/users/:id', ensureAuthorized, function (req, res) {
        var userId = req.params.id;
        tokenCheck(req.token, res, function (role) {
            if (role === "admin") {
                User.remove({
                    _id: userId
                }, function (err) {
                    if (err) res.send(err);
                    res.json({
                        message: 'user deleted!'
                    });
                });
            } else {
                res.send({
                    message: "Need Admin Rights",
                    status: 0
                })
            }
        })
    });
}
