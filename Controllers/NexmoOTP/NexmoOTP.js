
var express=require('express');
var router=express.Router();

var dbOps=require("./NexmoOTP_dbOps");


 
router.route('/') 
.post(dbOps.sendotp);



module.exports=router;