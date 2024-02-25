
var express=require('express');
var router=express.Router();

var dbOps=require("./PromotionQuantity_New_dbOps");



/**/ router.route('/:id/:seller_id') 
.get(dbOps.getPromotionQuantity); 

router.route('/:id?') 
.put(dbOps.editPromotionQuantity);
/* 
router.route('/:id?') 
.post(dbOps.newPromotionProduct);


router.route('/:id') 
.delete(dbOps.deletePromotionProduct); */


module.exports=router;