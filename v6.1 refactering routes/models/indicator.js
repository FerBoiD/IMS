var mongoose=require("mongoose");

var indicatorSchema=new mongoose.Schema({
    model_name:String,
    indicator_price:Number
});
 
module.exports = mongoose.model("indicator",indicatorSchema);

