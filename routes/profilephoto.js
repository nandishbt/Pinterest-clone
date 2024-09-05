const mongoose = require('mongoose');
const mongodb = require('../DB/mongo');

mongodb()
.then(function (){
  console.log('Connected to MongoDB');
})

// Define the schema for the post
const profpostSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
    
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref : 'User'
  },
  
});

// Create a Mongoose model based on the schema
const profPost = mongoose.model('profPost', profpostSchema);

// Export the Post model to use it in other parts of your application
module.exports = profPost;
