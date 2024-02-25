var express=require('express');
var router=express.Router();

var dbOps=require("./usermgt_Extra_dbOps");



router.route('/:id/:from_userExtra?/:approval_status?/:seller_id?')
.get(dbOps.Get_Consumer);


router.route('/:id?')
.put(dbOps.RegisterOrRequest) //registerrequest from new consumer or approval from supplier

router.route('/')
.post(dbOps.New_Consumer);// insert userExtra


module.exports=router;
