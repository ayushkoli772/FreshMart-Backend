//url used
//https://medium.com/@nehasunal/how-to-build-nodejs-express-rest-api-to-upload-image-using-multer-postgresql-d9ac5ae8eab

var express=require('express');
var router=express.Router();
/* */
var dbOps=require("./uploadImage_multer_dbOps");



router.route('/:id') 
.post(dbOps.upload.single('icon'),dbOps.uploadSingleImage); 
 
router.route('/:id') 
.delete(dbOps.uploadSingleImage); 
 

 

 



module.exports=router;