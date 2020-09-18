var mongoose=require("mongoose");
var orders   =require("./order");

var historySchema=new mongoose.Schema({
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ]
});             
 
module.exports = mongoose.model("history",historySchema);

