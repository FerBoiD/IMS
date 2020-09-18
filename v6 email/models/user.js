var mongoose                =require("mongoose");
var passportLocalMongoose   =require("passport-local-mongoose");
var orders                  =require("./order");
var wishlists               =require("./wishlist");
var histories               =require("./history");


var UserSchema=new mongoose.Schema({
    username: String,
    password: String,
    phone:Number,
    email:String,
    emailToken:String,
    isVerified:Boolean,
    address:String,
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"order"
        }
    ],
    wishlists:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"wishlist"
        }
    ],
    histories:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"history"
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("user",UserSchema);
