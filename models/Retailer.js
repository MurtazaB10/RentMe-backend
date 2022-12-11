const mongoose = require("mongoose");

const retailerSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  shopname: {
    type: String,
    require: true,
  },
  isVer: {
    type: Boolean,
    require: true,
  },
  email: {
      type: String,
      require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  phonenumber: {
      type: String,
      require: true,
  },
  address: {
    type: String,
    require: true,
  },
  validation: {
    documenttype: {
      type: String,
    },
    documentnumber: {
      type: String,
    },

    path: {
      type: String,
    },
  },
  DOB: {
    type: Date,
    require: true,
  },
});

const Retailer =  mongoose.model("retailer", retailerSchema);
module.exports = {Retailer};