const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  querymessage:{
      type:String,
      require:true
  },
  email:{
type:String,
require: true
  },
  date:{
      type:Date,
      default: Date.now
  }


})
export default model("feedback",feedbackSchema);