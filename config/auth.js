var User = require('./../app/models/user');
module.exports = {
    mailer: {
        auth: {
            api_key: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN__USER, // Your email id
            pass: process.env.MAILGUN__PASS // Your password
        }
    },
    ensureAuthorized: function(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    },
    tokenCheck: function(token,res, callback) {
        User.findOne({
            token: token
        }, function(err, requester) {
            if (err) res.send(err);
            if (requester) {
                callback(requester.role, requester.id);
            } else {
                res.send({
                    message: "No Access Rights",
                    status: 0
                })
            }
        })
    }
}