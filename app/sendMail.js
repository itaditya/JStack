var nodemailer = require('nodemailer');
module.exports = function (config, callback) {
    console.log(config);
    var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });
    var mailOptions = {
        from: '"Jstack Team" <adityaa803@gmail.com>', // sender address
        to: config.email, // list of receivers
        subject: 'Subscription Confirmation', // Subject line
        text: 'We are happy that you subscribed us!', // plaintext body
        html: '<b>We are happy that you subscribed us!</b>' // html body
    };
    if (config.type === 2) {
        mailOptions.subject = "Reset Password";
        var link = process.env.HOST_URL + "resetPassword?email=" + config.email + "&resetPasswordToken=" + config.resetPasswordToken;
        mailOptions.html = "<h1>Hi! we got your Request to change your Password</h1><p><a href='" + link + "'>Link to Reset</a></p>";
    }
    if (config.type === 3) {
        mailOptions.subject = "Verify Account";
        var link = process.env.HOST_URL + "api/users/verifyAccount/" + config.id + "?email=" + config.email;
        mailOptions.html = "<h1>Hi! Please Click the Link to Verify Account</h1><p><a href='" + link + "'>Link to Verify Account</a></p>";
    }
    mailOptions.to = 'b900000d7b-ee6731@inbox.mailtrap.io';
    transporter.sendMail(mailOptions, callback);
};
