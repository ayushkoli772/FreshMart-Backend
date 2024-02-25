
var express=require('express');
var router=express.Router();

var dbOps=require("./Products_dbOps");

var multer_dbOps=require("../uploadImage_multer/uploadImage_multer_dbOps");


//var multer  = require('multer');
//const upload = multer().fields([{ name: 'icon' }, { name: 'otherField' }]);


/* router.route('/:id?') 
.get(dbOps.getProducts); //getProducts is calling one method among three 
                         //if id gretar than zero , pbyid
                         //if id zero sellerid > 0 , products of sellers
                         //if id =0, seller_id=0, all products */

router.route('/:productId/:seller_id/:PageNumber/:PageSize/:sellerIDs/:categoryIDs/:productIds/:partialname/:skipIdsFromCartItems?') 
.get(dbOps.getProductsNew);

router.route('/') 
.post(multer_dbOps.upload.single('icon'),dbOps.newProduct);



 router.route('/:id?') 
.put(multer_dbOps.upload.single('icon'),dbOps.newProduct);   
 /*
router.route('/:id?') 
.put(dbOps.newProduct); 
*/



/* 
router.route('/:id?')
  .put( multer_dbOps.upload.single('icon'),(req, res, next) => { 
    console.log('->>>>>>>>>>>>>>>>>>>req.body.formData:'+JSON.stringify(req.body))
   if (!req.file) { //s && req.files['icon']
     // If no image file is provided, proceed to the newProduct handler directly
     console.log('no file provided')
     dbOps.newProduct(req, res);
   } else {
     // If an image file is provided, move to the next middleware (upload handling)
     console.log('file was provided')
    // next();
    
   }
 }//,multer_dbOps.upload.single('icon'),dbOps.newProduct
 )  */
  

/* 
router.route('/:id?')
  .put((req, res, next) => { 
    console.log('->>>>>>>>>>>>>>>>>>>req.body.formData:'+JSON.stringify(req.body))
   if (!req.file) { //s && req.files['icon']
     // If no image file is provided, proceed to the newProduct handler directly
     console.log('no file provided')
     dbOps.newProduct(req, res);
   } else {
     // If an image file is provided, move to the next middleware (upload handling)
     console.log('file was provided')
     next();
   }
 }, multer_dbOps.upload.single('icon'),dbOps.newProduct); 
  */

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