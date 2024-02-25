var express=require('express');
var router=express.Router();

var dbOps=require("./usermgt_dbOps");

router.route('/:id/:role/:userIDs/:mobileNumber?/:PageNumber?/:PageSize?/:seller_id?')
.get(dbOps.getUsers);

router.route('/:id?')
.put(dbOps.EditUser);

router.route('/:id')
.delete(dbOps.DeleteUser);

module.exports=router;
