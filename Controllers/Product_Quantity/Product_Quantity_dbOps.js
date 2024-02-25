var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
var cartHelper=require('../../Controllers/Cart/Cart_helper');
var cartitemHelper=require('../../Controllers/Cart/Cartitem_helper');

//const Cart=require('../../Models/cartModel');
//const CartItem = require('../../Models/cartItemModel');

var newCartitem=async (req,res)=>{
 

  try {
    // Get the cart data from the request body
    const { userId, item } = req.body;
    

 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();//function(err) {
      console.log('begin transaction');
  
  
    try { 

  
    var boolExistsCartOfUserid=await cartHelper.existsOrnot_Cartforuserid(userId);
  
    var cartId =0;
     /* */ // Insert the cart data into the 'cart' table , if already no cart for user
     if(boolExistsCartOfUserid==false){
      const cartResult = await transaction.request()
        .input('userId', sql.Int, userId)
        .query(`INSERT INTO Carts (userId) OUTPUT INSERTED.id VALUES (@userId)`);

      // Get the cart ID from the result of the previous query
       cartId = cartResult.recordset[0].id;
     }
else{//console.log('get already existing cart id of this user ')
cartId=await cartHelper.return_CartIDforuserid(userId);
}
 // check if user already has a cart
// let cart = await Cart.findOne({ userId });

var boolExistsProductInCart=await cartitemHelper.existsOrnot_ProductInCart(cartId,item.productId);
  
var cartitemId =0;
 /* */ // Insert the cart data into the 'cart' table , if already no cart for user
 if(boolExistsProductInCart==false){

  console.log('trying to inserting cartitem')
        await transaction.request()
         .input('cartId', sql.Int, cartId)
        
          .input('productId', sql.Int, item.productId)
          .input('product_name',sql.VarChar,item.product_name)
          .input('price', sql.Int, item.price)
          .input('quantity', sql.Int, item.quantity)         
          .input('seller_id', sql.Int, item.seller_id)
          .input('seller_name', sql.VarChar, item.seller_name)
          .input('CPorCQ',sql.VarChar,item.CPorCQ)
       .input('selectedUnit',sql.Int,item.selectedUnit)
          .query(`INSERT INTO cartItems (cartId,seller_id,seller_name, productId,product_name,price, quantity,CPorCQ,selectedUnit) 
                              VALUES (@cartId,@seller_id,@seller_name, @productId,@product_name,@price, @quantity,@CPorCQ,@selectedUnit)`);
      }
else{console.log('already existsing item in cartitem');console.log('now quantity is:'+item.quantity)
await transaction.request()
         .input('cartId', sql.Int, cartId)
        
          .input('productId', sql.Int, item.productId)
       .input('quantity',item.quantity)
       .input('price',item.price)
       .input('CPorCQ',item.CPorCQ)
       .input('selectedUnit',item.selectedUnit)
          .query(`Update cartItems set quantity=@quantity, price=@price, CPorCQ=@CPorCQ, selectedUnit=@selectedUnit where cartId=@cartId and productId=@productId`);
    console.log('@cartId:'+cartId)
}
      // Commit the transaction
      await transaction.commit();
    
      // Send a success response
     // res.send('Cart stored successfully.');
     res.status(200);
    } catch (error) {
      // Roll back the transaction in case of an error
      await transaction.rollback();
      console.log('error:'+error)
      throw error;
    }

  } catch (error) {
    // Send an error response
    res.status(500).send(error.message);
  } finally {
    // Close the SQL Server connection
    sql.close();
  }

}

var deleteCartitem=async (req,res)=>{

      console.log('deleting caritem with id:'+req.params.id)
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();//function(err) {
      console.log('begin transaction');
   
    try { 
  
      const cartResult = await transaction.request()
        .input('id', sql.Int, req.params.id)
        .query(`Delete From cartItems Where Id=@id`);

        const cartResult2 = await transaction.request()
        .input('id', sql.Int, req.params.id)
        .query(`Select * From cartItems Where cartId=(Select cartId From cartitems where id=@id)`);

        
        var boolCartitemsExistsInCart=cartitemHelper.existsOrnot_CartitemsInCart(req.params.id);

        if(boolCartitemsExistsInCart==false){
          //deleted cartitem was last cartitem from this cart, so delete cart record also
          console.log('deleting cart record also...')
       } 

     
     
      await transaction.commit();
      res.status(200).send(cartResult2.recordset);
     }
   
    
     
   catch (error) {
    // Send an error response
    res.status(500).send(error.message);
  } finally {
    // Close the SQL Server connection
    sql.close();
  }

}





var 
get_Product_Quantity=async (req,res)=>{ 
 
 console.log('get_Product_Quantity id:'+req.params.id)
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                         
                 var sp_name='sp_Product_Quantity_Get';    
            try{
              
              if(req.params.id){  request.input('id', sql.Int, req.params.id)}
              if(req.params.ProductId){  request.input('ProductId', sql.Int, req.params.ProductId)}

             
                var result = await request.execute(sp_name);
                res.status(200).json(result.recordset)
              }
              catch(error){
              Utilities.logError('sqlserver',sp_name,error)
              // console.log('Error catched:->'+error);
                res.status(201).json({"sp_data:":null})
                      
              }
              finally{
              
              } 
}

 module.exports={get_Product_Quantity}