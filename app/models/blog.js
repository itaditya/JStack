// grab the mongoose module
var mongoose = require('mongoose');
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Blog', {
    authorId: {
        type: String,
        default: ""
    },
    authorName: {
        type: String,
        default: "Anonymous"
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
    description: {
        type: String,
        default: "An aweome tutorial on how to get your hands dirty with coding"
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
        type: Array,
    },
    tagsData: {
        type: Array,
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: {
        type: String,
        default: ""
    }
});