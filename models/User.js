const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  phonenumber: {
      type: String,
      required: true,
  },
  address: {
    type: String,
    required: true,
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
  },
  scope: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        quantity: { type: Number },
      },
    ],
  },
});

const User =  mongoose.model("user", userSchema);
module.exports = {User};