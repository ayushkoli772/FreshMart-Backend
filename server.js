var auth=require('./Controllers/Login/auth');
const express = require('express');
const app = express();
const config = require('./config');

const cors = require('cors');
const bodyparser=require('body-parser');

const process = require('process');

app.use('*',cors());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.json()); 
const PORT=process.env.PORT || config.port;//3051;

loginC=require('./Controllers/Login/Login');
app.use('/api/login',loginC);

//JWT here------------------------------------------------------------------
//apply auth for all accept login
/* 
app.use("*", function(req,res,next){
 auth.auth(req,res,next);
});*/
//end JWT section------------------------------------------------------------
/*app.use("*", function(req,res,next){
 auth.auth(req,res,next);
}); */ 




 //its confirmed
 //Not in use url  api/user
 // usersC=require('./Controllers/Users/Users');
 // app.use('/api/User',usersC);

 /* */usermgtC=require('./Controllers/usermgt/usermgt');
 app.use('/api/Usermgt',usermgtC);
 
 usermgtExtraC=require('./Controllers/usermgt_Extra/usermgt_Extra');
 app.use('/api/UsermgtExtra',usermgtExtraC);

 productC=require('./Controllers/Products/Products');
 app.use('/api/product',productC);
 
categoryC=require('./Controllers/Category/Category');
app.use('/api/category',categoryC);

cartC=require('./Controllers/Cart/Cart');
app.use('/api/cart',cartC);

orderC=require('./Controllers/Order/Order');
app.use('/api/order',orderC);

/* notinuse order_NewC=require('./Controllers/Order_New/Order_New');
app.use('/api/order_New',order_NewC);
 */
ordercommissionC=require('./Controllers/Order_Commission/Order_Commission');
app.use('/api/ordercommission',ordercommissionC);

sellercommissionC=require('./Controllers/Seller_Commission/Seller_Commission');
app.use('/api/sellercommission',sellercommissionC);

sellerAreaC=require('./Controllers/Seller_Area/Seller_Area');
app.use('/api/sellerarea',sellerAreaC);

parameterC=require('./Controllers/Parameter/Parameter');
app.use('/api/parameter',parameterC);

orderitemC=require('./Controllers/OrderItem/OrderItem');
app.use('/api/orderitem',orderitemC);


promotionmastC=require('./Controllers/Promotion_Mast/Promotion_Mast');
app.use('/api/promotionmast',promotionmastC);

PromotionProductC=require('./Controllers/PromotionProduct/PromotionProduct');
app.use('/api/promotionproduct',PromotionProductC);

PromotionQuantityC=require('./Controllers/PromotionQuantity_New/PromotionQuantity_New');
app.use('/api/promotionQuantity',PromotionQuantityC);

PromotionOrderC=require('./Controllers/PromotionOrder/PromotionOrder');
app.use('/api/promotionorder',PromotionOrderC);


 uploadImage_multerC=require('./Controllers/uploadImage_multer/uploadImage_multer');
 app.use('/api/uploadImage_multer',uploadImage_multerC);
 
errorC=require('./Controllers/Error/Error');
app.use('/api/ErrorLog',errorC) 

razorC=require('./Controllers/Razor/Razor');
app.use('/api/Razor',razorC);


otpC=require('./Controllers/fast2sms/fast2sms');
app.use('/api/sendotpORregister',otpC);

unitmgtC=require('./Controllers/unitmgt/unitmgt');
app.use('/api/unitmgt',unitmgtC);

prod_quality_optionC=require('./Controllers/Product_Quantity/Product_Quantity');
app.use('/api/prod_quality',prod_quality_optionC);

/* CommissionC=require('./Controllers/Commission/Commission');
app.use('/api/commission',CommissionC) 
 */


app.listen(PORT,()=>console.log(`Server started on port ${PORT}`));
