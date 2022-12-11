const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  cart: {
  
  
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required:true,
          ref: "product",
        },
        qty: {
          type: Number,
          required:true,
          default: 0,
        }
       
      },
    ],
  },
  address: {
    type: String,
    required: true,
  },
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
  amount:Number,
  isPaid:Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Delivered: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("order",orderSchema);