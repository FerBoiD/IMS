require("dotenv").config();
var PORT = process.env.PORT || 5000;

var express                 =require("express"),
    app                     =express(),
    bodyParer               =require("body-parser"),
    mongoose                =require("mongoose"),
    bike                    =require("./models/bike_model"),
    orders                  =require("./models/order"),
    histories               =require("./models/history"),
    wishlists               =require("./models/wishlist"),
    indicator               =require("./models/indicator");
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose"),
    User                    =require("./models/user"),
    flash                   =require("connect-flash");


var cableRouter             =require("./routes/cables");
var indicatorRouter         =require("./routes/indicator");
var authenticationRouter    =require("./routes/authentication");
var transaction             =require("./routes/transaction");


const crypto                =require("crypto");
const sgMail                =require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(require("express-session")({
    secret:"This is some unvalid code",
    resave:false,
    saveUninitialized:false
}));


mongoose.connect("mongodb://localhost:/spare_parts",{useNewUrlParser:true , useUnifiedTopology: true ,useFindAndModify: false });
app.use(bodyParer.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(flash());
app.set("view engine","ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.message=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})


app.use(cableRouter);
app.use(indicatorRouter);
app.use(authenticationRouter);
app.use(transaction);

app.get("/",function(req,res){
    res.redirect("/landing");
})
app.get("/landing",function(req,res){
    res.render("index");
})



//==========================================================================================================

app.listen(PORT,function(){
    console.log("Server has started.....");
});
