const { model } = require("./models/bike_model");
const user = require("./models/user");

var PORT = process.env.PORT || 5000;

var express     =require("express"),
    app         =express(),
    bodyParer   =require("body-parser"),
    mongoose    =require("mongoose"),
    bike        =require("./models/bike_model"),
    orders       =require("./models/order"),
    histories     =require("./models/history"),
    wishlists    =require("./models/wishlist"),
    indicator    =require("./models/indicator");
    passport                =require("passport"),
    LocalStrategy           =require("passport-local"),
    passportLocalMongoose   =require("passport-local-mongoose");
    User                    =require("./models/user")

app.use(require("express-session")({
    secret:"This is some valid code",
    resave:false,
    saveUninitialized:false
}));

mongoose.connect("mongodb://localhost:/spare_parts",{useNewUrlParser:true , useUnifiedTopology: true ,useFindAndModify: false });
app.use(bodyParer.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

app.get("/",function(req,res){
    res.redirect("/landing");
})
app.get("/landing",function(req,res){
    res.render("index");
})

app.get("/cable",function(req,res){
    bike.find({},function(err,bike){
        if(err){
            console.log(err)
        }else{
            res.render("cable",{bikes:bike});
        }
    })
});

// ================================ADDING ORDERED PAGE================================================

app.post("/cable/:id/cluch",isLoggedin,function(req,res){
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
                        
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

app.post("/cable/:id/break",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

app.post("/cable/:id/accelator",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

app.post("/cable/:id/meter",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});


app.post("/wishlist/:id/cluch",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

app.post("/wishlist/:id/break",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});
app.post("/wishlist/:id/accelator",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});
app.post("/wishlist/:id/meter",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});
// ================================PAY PAGE========================================

app.get("/order",isLoggedin,function(req,res){
    User.findById(req.user._id).populate("orders").exec(function(err,user1){
        if(err){
            console.log(err);
        }else{
            res.render("order",{order:user1.orders});
        }
    })
})

// ====================================WISHLIST========================================
app.get("/wishlist",isLoggedin,function(req,res){
    User.findById(req.user._id).populate("wishlists").exec(function(err,user1){
        if(err){
            console.log(err);
        }else{
            res.render("wishlist",{wishlist:user1.wishlists});
        }
    })
})

// =================================REMOVE AND ADD FROM CART=====================================

app.post("/remove_from_cart/:id",function(req,res){
    orders.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/order");
        }
    });
});

app.post("/remove_from_wishlist/:id",function(req,res){
    wishlists.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/wishlist");
        }
    });
});

app.post("/add_to_cart/:id",function(req,res){
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
                            res.redirect("/order");
                        }
                    })
                }
            })
        }
    });
});
// ==========================================INDICATOR=================================================================

app.get("/indicator",function(req,res){
    indicator.find({},function(err,indicator){
        if(err){
            console.log(err)
        }else{
            res.render("indicator",{indicators:indicator});
        }
    })
});

app.post("/indicator/cart/:id",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});

app.post("/indicator/wishlist/:id",isLoggedin,function(req,res){
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
                        res.redirect("/cable");
                    }
                })
            }
        })
    })
});


  

// ===================================TRANSACTION=======================================
 app.post("/transaction",function(req,res){
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
app.get("/editDB",function(req,res){
    res.render("editDb");
});

app.post("/editDb",function(req,res){
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
app.get("/editIndicatorDB",function(req,res){
    res.render("editIndicatorDB");
});

app.post("/editIndicatorDb",function(req,res){
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


// ===================================AUTHENTICATION=====================================================

app.get("/register",function(req,res){
    res.render("register");
})
//,{phone:req.body.phone},{email:req.body.email},{address:req.body.address})
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err)
            return  res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
        })
    })
})


//Login=============================================================
app.get("/login",function(req,res){
    res.render("login");
})

app.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}),function(req,res){
})

//logout=============================================================
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

function isLoggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//==========================================================================================================

app.listen(PORT,function(){
    console.log("Server has started.....");
});
