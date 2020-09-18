var express=require("express");
var router =express.Router();
bike                    =require("../models/bike_model"),
orders                  =require("../models/order"),
histories               =require("../models/history"),
wishlists               =require("../models/wishlist"),
indicator               =require("../models/indicator");


router.get("/indicator",function(req,res){
    nomatch=null;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        indicator.find({model_name: regex},function(err,indicator){
            if(err){
                console.log(err)
            }else{
                if(indicator.length<1){
                    nomatch="Sorry!! no bike model matched your search...";
                }
                res.render("indicator",{indicators:indicator,nomatch:nomatch});
            }
        })
    }else{
        indicator.find({},function(err,indicator){
            if(err){
                console.log(err)
            }else{
                res.render("indicator",{indicators:indicator,nomatch:nomatch});
            }
        })
    }
});

router.post("/indicator/cart/:id",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    indicator.findById(req.params.id,function(err,indicator){
        var model=indicator.model_name + " Indicator";
        var price=indicator.indicator_price;
        if(peaceNo<5){
            var total_cost=(peaceNo*price)-((peaceNo*price)/10);
            var Order={model_name:model, original_price:price, peaces:peaceNo , offPercent:10 ,total:total_cost};
        }
        else if(peaceNo>=5){
            var total_cost=(peaceNo*price)-((peaceNo*price)*40/100);
            var Order={model_name:model, original_price:price, peaces:peaceNo , offPercent:40 ,total:total_cost};
        }
        User.findById(req.user._id,function(err,user1){
            if(err){
                console.log(err)
            }else{
                orders.create(Order,function(err,Order1){
                    if(err){
                        console.log(err)
                    }else{
                        user1.orders.push(Order1);
                        user1.save();
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to the Cart.");
                        res.redirect("/indicator");
                    }
                })
            }
        })
    })
});

router.post("/indicator/wishlist/:id",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    indicator.findById(req.params.id,function(err,indicator){
        var model=indicator.model_name + " Indicator";
        var price=indicator.indicator_price;
        if(peaceNo<5){
            var total_cost=(peaceNo*price)-((peaceNo*price)/10);
            var Order={model_name:model, original_price:price, peaces:peaceNo , offPercent:10 ,total:total_cost};
        }
        else if(peaceNo>=5){
            var total_cost=(peaceNo*price)-((peaceNo*price)*40/100);
            var Order={model_name:model, original_price:price, peaces:peaceNo , offPercent:40 ,total:total_cost};
        }
        User.findById(req.user._id,function(err,user1){
            if(err){
                console.log(err)
            }else{
                wishlists.create(Order,function(err,Order1){
                    if(err){
                        console.log(err)
                    }else{
                        user1.wishlists.push(Order1);
                        user1.save();
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added Wishlist.");
                        res.redirect("/indicator");
                    }
                })
            }
        })
    })
});

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;