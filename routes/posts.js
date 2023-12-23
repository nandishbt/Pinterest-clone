const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pinterestDB");

// Define the schema for the post
const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref : 'User'
  },
  caption: {
    type: String
    // You can add more validation options if needed
  }
});

// Create a Mongoose model based on the schema
const Post = mongoose.model('Post', postSchema);

// Export the Post model to use it in other parts of your application
module.exports = Post;
