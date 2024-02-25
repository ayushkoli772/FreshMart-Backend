
var express=require('express');
var router=express.Router();

var dbOps=require("./Cart_dbOps");

router.route('/:id?') 
.get(dbOps.getCart);
 
router.route('/') 
.post(dbOps.newCartitem);

router.route('/:id') 
.delete(dbOps.deleteCartitem);
/*

router.route('/:id?') 
.put(multer_dbOps.upload.single('icon'),dbOps.newProduct);

router.route('/:id') 
.delete(dbOps.deleteUsers); */

/* 
router.route('/') 
.put(dbOps.Register_ApproveDeviceForUser);
 */

//var cont=require('../../Controllers/device')
/* router.route('/:id')
.post(dbOps.postTest); */

module.exports=router;