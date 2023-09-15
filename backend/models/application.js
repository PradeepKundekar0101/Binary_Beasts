const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applicationSchema = new Schema({
  user: {
    type: String,
  }
})
const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;
