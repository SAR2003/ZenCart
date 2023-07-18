var express=require("express");
var router=express.Router();

var auth=require('../config/auth');
var isUser=auth.isUser;

var User=require('../models/user');

router.get("/",isUser,function(req,res)
{
    
    User.findOne({username:res.locals.user.username}).then((user)=>{
      
        const orderedProducts = user.orderedProducts;
        // const newOrderedProducts = req.session.cart;

        // let tot=0;
        // newOrderedProducts.forEach(function(prod){
            
        //      tot+=(prod.qty)*(prod.price) ;
        // })
        // newOrderedProducts.price=tot;

        // const allOrderedProducts = orderedProducts.concat(newOrderedProducts);
        // user.orderedProducts = allOrderedProducts;
        // user.save();
        res.render("myOrder",{title:"My Order",orderedProducts:orderedProducts});

    })
})

router.get("/place",function(req,res){

    
    User.findOne({username:res.locals.user.username}).then((user)=>{
      

        // console.log(user);
    
        let orderedProducts = [];
        orderedProducts =user.orderedProducts;
        //  console.log(orderedProducts);
        let newOrderedProducts = req.session.cart;

        let tot=0;
        newOrderedProducts.forEach(function(prod){
            
             tot+=(prod.qty)*(prod.price) ;
        })
        newOrderedProducts[0].price=tot;
          
        let  allOrderedProducts;
        if(orderedProducts.length===0)
        {
            allOrderedProducts= newOrderedProducts;
        }
        else
        {
            allOrderedProducts= orderedProducts.concat(newOrderedProducts);
        }

        
        user.orderedProducts = allOrderedProducts;
        user.save();
        delete req.session.cart;
        res.redirect('/orders');

    })
})

module.exports=router;


