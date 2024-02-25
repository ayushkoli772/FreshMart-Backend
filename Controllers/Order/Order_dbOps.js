var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');
var cartHelper=require('../../Controllers/Cart/Cart_helper');
var cartitemHelper=require('../../Controllers/Cart/Cartitem_helper');
var productHelper=require('../../Helpers/productHelper');

//const Cart=require('../../Models/cartModel');
//const CartItem = require('../../Models/cartItemModel');

var newOrder=async (req,res)=>{
 

  try {
   
    const {order_status, userId, seller_id, orderdate,orderItems,totalAmount,discount} = req.body;
    
    console.log('orderdate:'+orderdate)
 
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const transaction = new sql.Transaction(pool);
    await transaction.begin();//function(err) {
      console.log('begin transaction');
  
  
    try { 

    //, orderDate, totalAmount, 
    var orderId=0;
    var boolExistsCartOfUserid=await cartHelper.existsOrnot_Cartforuserid(userId);
    if (!boolExistsCartOfUserid) {
     throw new Error(`Cart not found for user with id ${userId}`);
   } else{console.log('cart exists for user n date');}
 
   /*  // Create a new order
    const order = await Order.create({
      userId: cart.userId,
      totalPrice: 0,
    }, { transaction }); */

  /*   console.log('trying to create order') /*   .input('orderdate', sql.DateTime, item.orderdate) */
  const orderinsertionResult = await transaction.request()
  .input('order_status',sql.VarChar,order_status)
         .input('userId', sql.Int, userId)        
         .input('seller_id',sql.Int,seller_id)
         .input('orderdate', sql.DateTime,orderdate)
          
         .input('totalAmount',sql.Int,totalAmount)
         .input('discount',sql.Int,discount)

          .query(`INSERT INTO [Order] (order_status,userId,seller_id,orderdate,total,discount)  OUTPUT INSERTED.id  VALUES (@order_status,@userId,@seller_id,@orderdate,@totalAmount,@discount)`); 
// Get the cart ID from the result of the previous query
orderId = orderinsertionResult.recordset[0].id;

console.log('newly gen orderId:'+orderId+' with orderdate:'+orderdate+' and orderItems are '+orderItems.length+' in count')

for (const orderItem of orderItems) { 
  if(productHelper.existsOrnot_Productforid(orderItem.productId) == false){
    throw new Error(`Product with id ${orderItem.productId} not found`);}
  

  const orderiteminsertionResult = await transaction.request()
  .input('orderId', sql.Int, orderId)        
  .input('productId', sql.Int,orderItem.productId)
  .input('price', sql.Int,orderItem.price)
  .input('quantity', sql.Int,orderItem.quantity)
  
  .input('pmultq', sql.Float,orderItem.pmultq)
  .input('selectedUnit', sql.Int,orderItem.selectedUnit)
  .input('CPorCQ', sql.VarChar,orderItem.CPorCQ)

  //added
  .input('seller_id',sql.Int,seller_id)

   .query(`INSERT INTO [OrderItem] (OrderId,seller_id,productId,price,quantity ,pmultq,selectedUnit, CPorCQ)  
   OUTPUT INSERTED.id  VALUES (@orderId,@seller_id,@productId,@price,@quantity,@pmultq,@selectedUnit,@CPorCQ)`); 
  
  }
  
  for(const orderItem of orderItems)
  { console.log('deleting cartitem of id:'+orderItem.id)
  const cartitemdeleteResult = await transaction.request()
  .input('orderId', sql.Int, orderId)        
  .input('productId', sql.Int,orderItem.productId)
   
   .query(`delete from cartitems where id=`+orderItem.id); 
}

  
/*
    // Loop through the cart items and add them to the order items
    for (const cartItem of cartItems) {
      const product = await Product.findByPk(cartItem.productId);
      if (!product) {
        throw new Error(`Product with id ${cartItem.productId} not found`);
      }

      // Create a new order item
      await OrderItem.create({
        orderId: order.id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        price: product.price,
      }, { transaction });

      // Update the total price of the order
      order.totalPrice += product.price * cartItem.quantity;
    }

    // Update the order with the total price
    await order.save({ transaction });

    // Remove the cart items
    await CartItem.destroy({
      where: {
        id: {
          [Op.in]: cartItems.map(item => item.id),
        },
      },
      transaction,
    });
*/
    
   
    await transaction.commit();
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

var changeOrder=async(req,res)=>{
  //id:orderstatuschange
  console.log('m in changeOrder and id is:'+req.params.id)
  
    changeOrderStatus(req,res);
  
  res.status(200);
}
         var changeOrderStatus=async(req,res)=>{
              console.log('m changing status of orderid:'+req.query.orderid+' to '+req.query.orderstatus)
              let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
              const request = pool.request();
                                     
                             var sp_name='sp_Order_Statuschange';    
                        try{
                          
                            request.input('orderid', sql.Int, req.query.orderid);
                            
                            request.input('orderstatus', sql.VarChar, req.query.orderstatus)
                             
            
                         
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

         }//change orderstatus to shippimg,Delievered,Complete

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





var getOrder=async (req,res)=>{ 
 
 console.log('getOrder id:'+req.params.id)
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                         
                 var sp_name='sp_Order_Get';    
            try{
              
              if(req.params.id){  request.input('userId', sql.Int, req.params.id)}
                 

             
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


//----------------------------------------------
const getOrders = async (req, res) => {
  try {
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request = pool.request();
    //const sp_name = 'sp_Orders_Get';
   const sp_name = 'sp_Order_Of_Seller_Status_Get';

   // console.log('req.params.customerId:'+req.params.customerId)
    
    if (req.params.customerId || req.params.customerId!==undefined) {
      request.input('customerId', sql.Int, req.params.customerId);
    //  console.log('parameter customerId exists:'+req.params.customerId)
    }

    if (req.params.sellerId) {
      request.input('sellerId', sql.Int, req.params.sellerId);
    //  console.log('parameter sellerId exists:'+req.params.sellerId)
    }

    if (req.params.orderStatus) {
      request.input('orderStatus', sql.NVarChar(50), req.params.orderStatus);
      //console.log('parameter orderStatus exists:'+req.params.orderStatus)
    }
    if (req.params.PageNumber) {
      request.input('PageNumber', sql.NVarChar(50), req.params.PageNumber);
      //console.log('parameter PageNumber exists:'+req.params.PageNumber)
    }
    if (req.params.PageSize) {
      request.input('PageSize', sql.NVarChar(50), req.params.PageSize);
      //console.log('parameter PageNumber exists:'+req.params.PageNumber)
    }
    const result = await request.execute(sp_name);
    res.status(200).json(result.recordset);
  } catch (error) {
    Utilities.logError('sqlserver', 'getOrders', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
//----------------------------------------------
 module.exports={getOrder,getOrders,newOrder,changeOrder,deleteCartitem}