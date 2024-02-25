var sql = require('mssql');
var sqlConfigFile=require('../Connections/sqlConfig');
const pool = new sql.ConnectionPool(sqlConfigFile);


var logError=async (error_Type,Error_Object,errorDescription)=>{
   console.log('This is logError type'+error_Type+'  ,objectname:'+Error_Object+' , Description:'+errorDescription);
   //sp_ErrorLog

   let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
   const request =  pool.request();                 
   try{ 
      
      request.input('error_Type', sql.VarChar,error_Type);
      request.input('Error_Object', sql.VarChar,Error_Object);      
      request.input('error_Description', sql.VarChar,errorDescription);

      await request.execute('sp_ErrorLog'); 

   }catch(error)
   {
      console.log('logerror itself is having error')
   }
}

var existsOrnot_Cartforuserid=async(userId)=>{
  
   try {
      await pool.connect();
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
module.exports={logError}