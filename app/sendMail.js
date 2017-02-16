var nodemailer = require('nodemailer');
module.exports = function (config,callback) {
    console.log(config,callback);
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
        // to: 'git2adi@gmail.com, adityaa803@gmail.com', // list of receivers
        to: 'b900000d7b-ee6731@inbox.mailtrap.io', // list of receivers
        subject: 'Subscription Confirmation', // Subject line
        text: 'We are happy that you subscribed us!', // plaintext body
        html: '<b>We are happy that you subscribed us!</b>' // html body
    };
    transporter.sendMail(mailOptions, callback);
};
