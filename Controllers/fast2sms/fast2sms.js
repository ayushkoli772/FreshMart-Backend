
var express=require('express');
var router=express.Router();

var dbOps=require("./fast2sms_dbOps");


 
router.route('/:id') 
.post(dbOps.sendotpORregister);



module.exports=router;