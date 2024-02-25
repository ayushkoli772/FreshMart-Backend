
var express=require('express');
var router=express.Router();

var dbOps=require("./Promotion_Mast_dbOps");


 router.route('/') 
.get(dbOps.getPromotionMast);
 /* 
router.route('/') 
.post(dbOps.newOrder);

router.route('/:id') 
.delete(dbOps.deleteCartitem); */

module.exports=router;