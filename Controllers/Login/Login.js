
var express=require('express');
var router=express.Router();
/* */
var dbOps=require("./Login_dbOps");


router.route('/:id') // 
.post(dbOps.getLoggedin); 




module.exports=router;