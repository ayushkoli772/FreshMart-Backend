var express=require('express');
var router=express.Router();



var dbOps=require("./Razor_dbOps");

router.route('/')
.post(dbOps.CreateRPOrder);
router.route('/:id')
.post(dbOps.PayOrder);

module.exports=router;
