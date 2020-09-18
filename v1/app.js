const { compile } = require("ejs");

var PORT = process.env.PORT || 5000;

var express     =require("express"),
    app         =express(),
    bodyParer   =require("body-parser"),
    mongoose    =require("mongoose"),
    bike        =require("./models/bike_model"),
    order       =require("./models/order"),
    history     =require("./models/history"),
    wishlists    =require("./models/wishlist");

mongoose.connect("mongodb://localhost:/spare_parts",{useNewUrlParser:true , useUnifiedTopology: true ,useFindAndModify: false });
app.use(bodyParer.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");


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

app.post("/cable/:id/:type",function(req,res){
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
        order.create(Order,function(err,Order){
            if(err){
                console.log(err)
            }else{
                res.redirect("/cable");
            }
        })
    })
});
// ====================================WISHLIST========================================
app.get("/wishlist",function(req,res){
    wishlists.find({},function(err,wishlist){
        if(err){
            console.log(err);
        }else{
            res.render("wishlist",{wishlist:wishlist});
        }
    })
})

app.post("/wishlist/:id/:type",function(req,res){
    var peaceNo=req.body.peaces;
    bike.findById(req.params.id,function(err,bike){
        var model=bike.model_name + " Cluch Cable";
        var price=bike.cluch_price;
        if(peaceNo<5){
            var total_cost=(peaceNo*price)-((peaceNo*price)/10);
            var wishlist={model_name:model, original_price:price, peaces:peaceNo , offPercent:10 ,total:total_cost};
        }
        else if(peaceNo>=5){
            var total_cost=(peaceNo*price)-((peaceNo*price)*40/100);
            var wishlist={model_name:model, original_price:price, peaces:peaceNo , offPercent:40 ,total:total_cost};
        }
        wishlists.create(wishlist,function(err,wishlist){
            if(err){
                console.log(err)
            }else{
                res.redirect("/cable");
            }
        })
    })
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
            var Order={model_name:product.model_name, original_price:product.original_price, peaces:product.peaces , offPercent:product.offPercent ,total:product.total};
            order.create(Order,function(err,Order){
                if(err){
                    console.log(err)
                }else{
                    res.redirect("/order");
                }
            })
        }
    });
});

// ================================PAY PAGE========================================

app.get("/order",function(req,res){
    order.find({},function(err,Order){
        if(err){
            console.log(err);
        }else{
            res.render("order",{order:Order});
        }
    })
})

// ===================================TRANSACTION=======================================
//  app.post("/transaction",function(req,res){
//      var Comorder = order.find({});
//      console.log(Comorder);
//     history.create(Comorder,function(err,history){
//         if(err){
//             console.log(err)
//         }else{
//                 // history.find({},function(err,history){
//             //     if(err){
//             //         console.log(err);
//             //     }else{
//             //         history.order.find({},function(err,order){
//             //             console,localStorage(order);
//             //         })
//             //     }
//             // })
//             console.log(history);
//             res.redirect("/cable");
//         }
//     })
// //     history.create(function(err,history){
// //         if(err){
// //             console.log(err)
// //         }else{
// //             order.find({},function(err,products){
// //                 if(err){
// //                     console.log(err);
// //                 }else{
// //                     history.order.push(products);
// //                 }
// //             })
// //         }
// //     })

//     // order.find({},function(err,products){
//     //     if(err){
//     //         console.log(err);
//     //     }else{
//     //         history.create
//     //     }
//     // })

// })
// =================================REMOVE FROM CART=====================================

app.post("/remove_from_cart/:id",function(req,res){
    order.findByIdAndRemove(req.params.id,function(err,product){
        if(err){
            console.log(err);
        }else{
            res.redirect("/order");
        }
    });
});

// =============================ADDING TO DB==========================================
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

app.listen(PORT,function(){
    console.log("Server has started.....");
});
