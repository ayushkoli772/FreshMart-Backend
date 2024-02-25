
var express=require('express');
var router=express.Router();

var dbOps=require("./textLocal_dbOps_New");


 
router.route('/') 
.post(dbOps.sendotp);



module.exports=router;