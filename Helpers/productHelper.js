var sql = require('mssql');
var sqlConfigFile=require('../Connections/sqlConfig');
const pool = new sql.ConnectionPool(sqlConfigFile);


var existsOrnot_Productforid=async(productId)=>{
  
   try {
      await pool.connect();
      const result = await pool.request()
        .input('productId', sql.Int, productId)
        .query('SELECT count(*) productCount FROM Products WHERE id = @productId');
              
        if(result.recordset[0].productCount==0){ return false; }         else { return true;  }

    } catch (err) {
      console.log(err);
    } finally {
      pool.close();
    }
}
var return_CartIDforuserid=async(userId)=>{
  
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
module.exports={existsOrnot_Productforid,return_CartIDforuserid}