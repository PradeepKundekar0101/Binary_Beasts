const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  profilePicture:{
    default:"https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png",
    type:String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
  first_name: {
    default:"",
    type: String,
  },
  last_name: {
    default:"",
    type: String,
   
  },
  role: {
    default:"",
    type: String,
    enum: ['admin', 'teacher', 'staff'], 
  
  },
  verified:{
    type:Boolean,
    default:false
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
