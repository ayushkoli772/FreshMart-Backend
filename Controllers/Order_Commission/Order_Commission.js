
var express=require('express');
var router=express.Router();

var dbOps=require("./Order_Commission_dbOps");


 router.route('/:sellerId/:orderStatus?') 
.get(dbOps.getOrders_Commission);
 
router.route('/:id') 
.put(dbOps.chgOrders_Commission);
 


module.exports=router;