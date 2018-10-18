const mongoose = require('mongoose');
const Photos = require('./photo');

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  photos: [Photos.schema]
});


module.exports = mongoose.model('Users', userSchema);
