
var express=require('express');
var router=express.Router();

var dbOps=require("./Error_dbOps");

router.route('/')
.get(dbOps.getErrorLogs);

router.route('/')
.delete(dbOps.deleteErrorLogs);


module.exports=router;