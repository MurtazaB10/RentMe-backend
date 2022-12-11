const mongoose = require('mongoose');

const verificationtokenSchema = new mongoose.Schema({
  owner: {
    type: Object,
    required: true,
  },
  otp1: {
    type: String,
    required: true,
  },
  otp2: {
    type: String,
    required: true,
  },
  createdAt:{
      type:Date,
      expireAfterSeconds: 300,
      default:Date.now()
  }
});

const Verificationtoken = mongoose.model('verificationtoken',verificationtokenSchema);
module.exports = {Verificationtoken};