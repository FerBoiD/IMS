var express=require("express");
var router =express.Router();
bike                    =require("../models/bike_model"),
orders                  =require("../models/order"),
histories               =require("../models/history"),
wishlists               =require("../models/wishlist"),
indicator               =require("../models/indicator");


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/cable",function(req,res){
    var nomatch=null;
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        bike.find({model_name: regex},function(err,bike){
            if(err){
                console.log(err)
            }else{
                if(bike.length<1){
                    nomatch="Sorry!! no bike model matched your search...";
                }
                res.render("cable",{bikes:bike,nomatch:nomatch});
            }
        })
    }else{
        bike.find({},function(err,bike){
            if(err){
                console.log(err)
            }else{
                res.render("cable",{bikes:bike,nomatch:nomatch});
            }
        })
    }
});

// ================================ADDING ORDERED PAGE================================================

router.post("/cable/:id/cluch",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Cluch Cable";
        var price=bike.cluch_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to the cart.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

router.post("/cable/:id/break",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Break Cable";
        var price=bike.break_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to the cart.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

router.post("/cable/:id/accelator",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Accelator Cable";
        var price=bike.accelator_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to the cart.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

router.post("/cable/:id/meter",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Meter Cable";
        var price=bike.meter_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to the cart.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});


router.post("/wishlist/:id/cluch",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Cluch Cable";
        var price=bike.cluch_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to your Wishlist.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

router.post("/wishlist/:id/break",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Break Cable";
        var price=bike.break_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to your Wishlist.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});
router.post("/wishlist/:id/accelator",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Accelator Cable";
        var price=bike.accelator_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to your Wishlist.");
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});
router.post("/wishlist/:id/meter",isLoggedin,function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Meter Cable";
        var price=bike.meter_price;
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
                        req.flash("success",Order.peaces+ " units of "+ Order.model_name +" has been added to your Wishlist.");
                        res.redirect("/cable");
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