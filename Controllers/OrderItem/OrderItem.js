
var express=require('express');
var router=express.Router();

var dbOps=require("./OrderItem_dbOps");

/* router.route('/:id?') 
.get(dbOps.getOrder);
  */
 router.route('/:id/:orderid') //here id is individual orderitem id and orderid is id of order which may span multiple items
.get(dbOps.getOrderItems);
 /* 
router.route('/') 
.post(dbOps.newOrder);

router.route('/:id') 
.delete(dbOps.deleteCartitem); */

module.exports=router;