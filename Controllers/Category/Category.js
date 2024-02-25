
var express=require('express');
var router=express.Router();

var dbOps=require("./Category_dbOps");

router.route('/:id?/:sellerdids?') 
.get(dbOps.getCategories); 

router.route('/') 
.post(dbOps.newProduct);


router.route('/:id?') 
.put(dbOps.editUsers);

router.route('/:id') 
.delete(dbOps.deleteUsers);


module.exports=router;