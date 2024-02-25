
var express=require('express');
var router=express.Router();

var dbOps=require("./Users_dbOps");
router.route('/:id?') // with id
.get(dbOps.getUsers);

router.route('/') // without id means user registering and return here logical gate is open or not
.post(dbOps.newUsers);


router.route('/:id?') 
.put(dbOps.editUsers);

router.route('/:id') 
.delete(dbOps.deleteUsers);

/* 
router.route('/') 
.put(dbOps.Register_ApproveDeviceForUser);
 */

//var cont=require('../../Controllers/device')
/* router.route('/:id')
.post(dbOps.postTest); */

module.exports=router;