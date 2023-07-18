var mongoose=require('mongoose');

// user schema

const productSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    qty: {
        type:Number,
        required:true
    },
  
    price:{

        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    }
  });
  
var Userschema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    admin:{
        type:Number
    },
    orderedProducts:[productSchema]
});

var User=module.exports=mongoose.model('User',Userschema);