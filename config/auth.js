module.exports = {
    mailer: {
        auth: {
            domain: process.env.MAILGUN__USER, // Your email id
            pass: process.env.MAILGUN__PASS // Your password
        }
    }
}