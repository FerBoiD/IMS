var mongoose=require("mongoose");

var bikeSchema=new mongoose.Schema({
    model_name:String,
    cluch_price:Number,
    break_price:Number,
    accelator_price:Number,
    meter_price:Number
});
 
module.exports = mongoose.model("bike",bikeSchema);

