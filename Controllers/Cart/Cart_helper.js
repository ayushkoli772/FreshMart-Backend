var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
const pool = new sql.ConnectionPool(sqlConfigFile);


var existsOrnot_Cartforuserid=async(userId)=>{
  
   try {
     // await pool.connect(); replaced 25Aug23 by below
     let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT count(*) usercartcount FROM Carts WHERE userId = @userId');
              
        if(result.recordset[0].usercartcount==0){ return false; }         else { return true;  }

    } catch (err) {
      console.log(err);
    } finally {
      pool.close();
    }
}
var return_CartIDforuserid=async(userId)=>{
  setTimeout(() => {
    
  }, 4000);
   try {
    console.log('min return_CartIDforuserid')
     // await pool.connect(); replaced 25Aug23 by below
     let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
      const result = await pool.request()
        .input('userId', sql.Int, userId)
        .query('SELECT id usercartId FROM Carts WHERE userId = @userId');
        
        console.log('min return_CartIDforuserid returning cartid')

        return result.recordset[0].usercartId;

    } catch (err) {
      console.log(err);
    } finally {
      console.log('min return_CartIDforuserid closing pool')
      pool.close();
    }
}
module.exports={existsOrnot_Cartforuserid,return_CartIDforuserid}