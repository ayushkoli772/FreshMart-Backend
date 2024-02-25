
var express=require('express');
var router=express.Router();

var dbOps=require("./Product_Quantity_dbOps");


router.route('/:id?/:ProductId?') 
.get(dbOps.get_Product_Quantity);
 

module.exports=router;