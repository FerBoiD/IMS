var mongoose=require("mongoose");
var order   =require("./order");

var historySchema=new mongoose.Schema({
    order:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ]
});
 
module.exports = mongoose.model("history",historySchema);

