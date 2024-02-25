
var express=require('express');
var router=express.Router();

var dbOps=require("./msg91OTP_dbOps");


 
router.route('/') 
.post(dbOps.sendotp);



module.exports=router;