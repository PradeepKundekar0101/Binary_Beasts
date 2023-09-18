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
  firstname: {
    default:"",
    type: String,
  },
  lastname: {
    default:"",
    type: String,
   
  },
  role: {
    default:"",
    type: String,
   
  
  },
  phonenumber:{
    default:"",
    type:Number
  },
  verified:{
    type:Boolean,
    default:false
  },
}, {
    timestamps: true, 
  });


const User = mongoose.model('User', userSchema);

module.exports = User;
