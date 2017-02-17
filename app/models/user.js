// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: "Anonymous"
    },
    description: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    blogs: {
        type: Array,
    },
    verified: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: ""
    },
    resetPasswordToken: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "author"
    }
});