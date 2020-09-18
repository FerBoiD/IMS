var express=require("express");
var router =express.Router();
var User        =require("../models/user")
var order       =require("../models/order")
var wishlist    =require("../models/wishlist")


router.get("/order",isLoggedin,function(req,res){
    User.findById(req.user._id).populate("orders").exec(function(err,user1){
        if(err){
            console.log(err);
        }else{
            res.render("order",{order:user1.orders});
        }
    })
})

// ====================================WISHLIST========================================
router.get("/wishlist",isLoggedin,function(req,res){
    User.findById(req.user._id).populate("wishlists").exec(function(err,user1){
        if(err){
            console.log(err);
        }else{
            res.render("wishlist",{wishlist:user1.wishlists});
        }
    })
})

// =================================REMOVE AND ADD FROM CART=====================================

router.post("/remove_from_cart/:id",function(req,res){
    orders.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            req.flash("success",product.peaces+ " units of "+ product.model_name +" has been removed from the Cart.");
            res.redirect("/order");
        }
    });
});

router.post("/remove_from_wishlist/:id",function(req,res){
    wishlists.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            req.flash("success",product.peaces+ " units of "+ product.model_name +" has been removed from your Wishlist.");
            res.redirect("/wishlist");
        }
    });
});

router.post("/add_to_cart/:id",function(req,res){
    wishlists.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            console.log(product.model_name);
            var Order={model_name:product.model_name, original_price:product.original_price, peaces:product.peaces , offPercent:product.offPercent ,total:product.total};
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
                            req.flash("success",product.peaces+ " units of "+ product.model_name +" has been removed from your Wishlist and added to the Cart.");
                            res.redirect("/order");
                        }
                    })
                }
            })
        }
    });
});

  

// ===================================TRANSACTION=======================================
router.post("/transaction",function(req,res){
    i=0;
    orders.find({},function(err,Order){
        if(err){
            console.log(err)
        }else{
            Order.forEach(function(order1){
                        order2={model_name:order1.model_name,original_price:order1.original_price,peaces:order1.peaces,offPercent:order1.offPercent,total:order1.total};
                        console.log(order2);
                        if(i==0){
                            histories.create(order2,function(err,history1){
                                if(err){
                                    console.log(err)
                                }else{
                                    // global.his_id =history1._id;
                                    function his(){
                                        return history1._id;
                                    }
                                    console.log("YOO");
                                    
                                }
                            })
                        }else{
                            console.log("NO");
                            his_id= his();
                            console.log(his_id);
                            histories.findById(his_id,function(err,history1){
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("YOOIOI");
                                    history1.orders.push(order2);
                                    history1.save();
                                    res.redirect("/");
                                }
                            })
                        }
                        global.i=global.i+1;
            })
        }
    })
    console.log("dods");
})
//     history.create(function(err,history){
//         if(err){
//             console.log(err)
//         }else{
//             order.find({},function(err,products){
//                 if(err){
//                     console.log(err);
//                 }else{
//                     history.order.push(products);
//                 }
//             })
//         }
//     })

    // order.find({},function(err,products){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         history.create
    //     }
    // })


// =============================ADDING TO CABLE DB==========================================
router.get("/editDB",function(req,res){
    res.render("editDb");
});

router.post("/editDb",function(req,res){
    var model=req.body.model_name;
    var cluch=req.body.cluch;
    var brak=req.body.break;
    var accelator=req.body.accelator;
    var meter=req.body.meter;
    var newModel={model_name:model, cluch_price:cluch , break_price:brak, accelator_price:accelator, meter_price:meter};
    
    bike.create(newModel,function(err,bike){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
});

// =============================ADDING TO INDICATOR DB==========================================
router.get("/editIndicatorDB",function(req,res){
    res.render("editIndicatorDB");
});

router.post("/editIndicatorDb",function(req,res){
    var model=req.body.model_name;
    var price=req.body.price;
    var newModel={model_name:model, indicator_price:price};
    
    indicator.create(newModel,function(err,indicator){
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
});

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;