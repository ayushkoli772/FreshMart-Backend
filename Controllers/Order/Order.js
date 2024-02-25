
var express=require('express');
var router=express.Router();

var dbOps=require("./Order_dbOps");

/* router.route('/:id?') 
.get(dbOps.getOrder);
  */
 router.route('/:customerId/:sellerId/:orderStatus?/:PageNumber?/:PageSize?') 
.get(dbOps.getOrders);
 
router.route('/') 
.post(dbOps.newOrder);

router.route('/:id') 
.put(dbOps.changeOrder);


router.route('/:id') 
.delete(dbOps.deleteCartitem);

module.exports=router;