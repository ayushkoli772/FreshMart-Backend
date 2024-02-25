
var express=require('express');
var router=express.Router();

var dbOps=require("./unitmgt_dbOps");

router.route('/:id?') 
.get(dbOps.getUnitMaster); 


module.exports=router;