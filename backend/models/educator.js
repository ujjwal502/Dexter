const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  skills:{
      type:String,
      required:true
  },
  doj: {
    type: Date,
    default: Date.now
  }
});

const educator = mongoose.model('educator', educatorSchema);

module.exports = educator;