const mongoose = require('mongoose');

//blog schema
const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created: {type: Date, default: Date.now},
  author: {
    firstName: String,
    lastName: String
  }
});

//allows author name to be one readable string
blogSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    created: this.created,
    author: this.authorName
  };
}
const blogPost = mongoose.model('blogPost', blogSchema);

module.exports = {blogPost};