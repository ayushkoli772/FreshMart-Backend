
var express=require('express');
var router=express.Router();

var dbOps=require("./Parameter_dbOps");

router.route('/') 
.get(dbOps.get_Parameter_Setting); 

module.exports=router;