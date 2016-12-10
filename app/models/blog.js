// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Blog', {
    authorId: {
        type: String,
        default: ""
    },
    date: {
        type: Number,
        default: ""
    },
    title: {
        type: String,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    mdString: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    tags: {
        type: String,
        default: ""
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        default: ""
    }
});