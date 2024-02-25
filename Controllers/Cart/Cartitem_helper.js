var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
const pool = new sql.ConnectionPool(sqlConfigFile);


var existsOrnot_ProductInCart=async(cartId,productId)=>{
  
   try {
      await pool.connect();
      const result = await pool.request()
        .input('cartId', sql.Int, cartId)
        .input('productId', sql.Int, productId)
        .query('SELECT count(*) cartitem_count FROM cartitems WHERE cartId = @cartId and productId=@productId');
              
        if(result.recordset[0].cartitem_count==0){ return false; }         else { return true;  }

    } catch (err) {
      console.log(err);
    } finally {
      pool.close();
    }
}
var return_CartitemIDforuserid=async(userId)=>{
  
   try {
      await pool.connect();
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT id usercartId FROM Carts WHERE userId = @userId');
           
        return result.recordset[0].usercartId;

    } catch (err) {
      console.log(err);
    } finally {
      pool.close();
    }
}

var existsOrnot_CartitemsInCart=async(cartId)=>{
  
  try {
     await pool.connect();
     const result = await pool.request()
       .input('cartId', sql.Int, cartId)
       .query('SELECT count(*) cartitem_count From cartItems Where cartId=(Select cartId From cartitems where id=@cartId)');
          
       console.log('result.recordset[0].cartitem_count==0:'+result.recordset[0].cartitem_count==0);

       if(result.recordset[0].cartitem_count==0){ return false; }         else { return true;  }

   } catch (err) {
     console.log(err);
   } finally {
     sql.close();pool.close();
   }
}

module.exports={existsOrnot_ProductInCart,return_CartitemIDforuserid,existsOrnot_CartitemsInCart}