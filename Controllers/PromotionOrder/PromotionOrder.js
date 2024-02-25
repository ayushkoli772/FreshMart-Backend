
var express=require('express');
var router=express.Router();

var dbOps=require("./PromotionOrder_dbOps");



/**/ router.route('/:id/:seller_id') 
.get(dbOps.getPromotionOrders); 

router.route('/:id?') 
.post(dbOps.newPromotionOrder);


router.route('/:id') 
.delete(dbOps.deletePromotionOrder);




module.exports=router;