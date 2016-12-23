var mongoose = require('mongoose');
module.exports = mongoose.model('Tag', {
  name : {
    type: String
  },
  category : {
    type: String
  },
  blogs: {
    type: Array
  },
  coverImages: {
    type: Array
  }
});
