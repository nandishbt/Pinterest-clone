const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const mongodb = require('../DB/mongo');

mongodb()
.then(function (){
  console.log('Connected to MongoDB');
})


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  posts: {
    type : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'Post'
    }]
    
  },

  prof: {
    
      type : mongoose.Schema.Types.ObjectId,
      ref : 'profPost'
      
    
    
  },

  password: {
    type: String,
  
  },
  fullname:String
  // You can add more fields as needed for your user model
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
