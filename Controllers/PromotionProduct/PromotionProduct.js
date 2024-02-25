
var express=require('express');
var router=express.Router();

var dbOps=require("./PromotionProduct_dbOps");



/**/ router.route('/:id/:seller_id') 
.get(dbOps.getPromotionProducts); 

router.route('/:id?') 
.post(dbOps.newPromotionProduct);


router.route('/:id') 
.delete(dbOps.deletePromotionProduct);


module.exports=router;