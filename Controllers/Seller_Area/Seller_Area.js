var express=require('express');
var router=express.Router();

var dbOps=require("./Seller_Area_dbOps");



router.route('/:id?')
.get(dbOps.Get_Parametric_Result);




module.exports=router;
