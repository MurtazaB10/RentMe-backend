const  mongoose  = require("mongoose");

const CategorySchema = new mongoose.Schema({
education: {
    type: Boolean,
},
electronic:{
    type: Boolean,
},
fashion:{
    type: Boolean,
},
furniture:{
    type: Boolean,
},
Property:{
    type: Boolean,
}
});

module.exports = Model("category", CategorySchema);