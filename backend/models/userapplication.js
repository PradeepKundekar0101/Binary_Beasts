const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true, 
  },
  user_id:String,
  firstname: String,
  lastname: String,
  profilePicture:String,
  role:String,
  phonenumber: String,
  profilePicture:String
});

const UserApplication = mongoose.model('UserApplication', applicationSchema);

module.exports = UserApplication; 