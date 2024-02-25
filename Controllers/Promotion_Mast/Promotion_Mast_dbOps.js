var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');



var getPromotionMast=async (req,res)=>{ 
 
  let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
  const request = pool.request();
                         
                 var sp_name='sp_PromotionMast_Get';    
            try{
                                   
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
 module.exports={getPromotionMast:getPromotionMast}