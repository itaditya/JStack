module.exports = {
    mailer: {
        auth: {
            api_key: process.env.MAILGUN_KEY,
            domain: process.env.MAILGUN__USER, // Your email id
            pass: process.env.MAILGUN__PASS // Your password
        }
    }
}