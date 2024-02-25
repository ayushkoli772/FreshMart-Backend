var sql = require('mssql');
var sqlConfigFile=require('../../Connections/sqlConfig');
var Utilities=require('../../Utilities/Utilities');

//----------------------------------------------
const getOrders_Commission = async (req, res) => {
  try {
    let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
    const request = pool.request();
    const sp_name = 'sp_Orders_Commission_Get';

      
 

    if (req.params.sellerId) {
      request.input('sellerId', sql.Int, req.params.sellerId);
    
    }

    if (req.params.orderStatus) {
      request.input('orderStatus', sql.NVarChar(50), req.params.orderStatus);
     
    }

    const result = await request.execute(sp_name);
    res.status(200).json(result.recordset);
  } catch (error) {
    Utilities.logError('sqlserver', 'getOrders_Commission', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

var chgOrders_Commission=async(req,res)=>{
  
    if(req.params.id=='PayCommission')
    {
      Order_Commission_UpdateAsPaid(req,res);
    }

}

      var Order_Commission_UpdateAsPaid=async(req,res)=>{
      console.log('AAAAAAAAAAAAAAAAAAA req.query.orderIds_comma_seperated:'+req.query.orderIds_comma_seperated)

        try {
          let pool = await new sql.ConnectionPool(sqlConfigFile).connect();
          const request = pool.request();
          const sp_name = 'sp_Order_Commission_UpdateAsPaid';                   
      
         if(req.query.orderId){
            request.input('orderid', sql.Int, req.query.orderId);
            }
            if(req.query.orderIds_comma_seperated){
              request.input('orderIds_comma_seperated', sql.VarChar, req.query.orderIds_comma_seperated);
              }     
      
          const result = await request.execute(sp_name);
          res.status(200).json(result.recordset);
        } catch (error) {
          Utilities.logError('sqlserver', sp_name , error);
          res.status(500).json({ message: 'Internal server error' });
        }

      }
//----------------------------------------------
 module.exports={getOrders_Commission, chgOrders_Commission}