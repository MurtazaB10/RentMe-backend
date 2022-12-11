const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
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
export default model("query",querySchema);