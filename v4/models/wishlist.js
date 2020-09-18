var mongoose=require("mongoose");

var wishlistSchema=new mongoose.Schema({
    model_name:String,
    original_price:Number,
    peaces:Number,
    offPercent:Number,
    total:Number
});
 
module.exports = mongoose.model("wishlist",wishlistSchema);