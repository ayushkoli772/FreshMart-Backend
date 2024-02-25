
var express=require('express');
var router=express.Router();

var dbOps=require("./Seller_Commission_dbOps");

router.route('/:id?') 
.get(dbOps.get_Seller_Commission_Setting); 
/* 
router.route('/') 
.post(dbOps.newProduct);

*/

router.route('/:id?') 
.put(dbOps.edit_Seller_Commission_Setting);
/*
router.route('/:id') 
.delete(dbOps.deleteUsers); */


module.exports=router;