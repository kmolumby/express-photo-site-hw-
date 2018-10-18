const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  img: {type: String, required: true},
  caption: {type: String}
});


module.exports = mongoose.model('Photos', photoSchema);
