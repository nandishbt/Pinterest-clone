const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/pinterestDB");


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
  password: {
    type: String,
  
  },
  fullname:String
  // You can add more fields as needed for your user model
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
